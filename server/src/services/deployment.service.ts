import { TRPCError } from "@trpc/server";
import {
  ICurrentDeploymentStatus,
  IDeployment,
  IDeploymentData,
  IDeploymentStatus,
  IUser,
} from "common";
import { z } from "zod";
import { github, query } from "../lib";
import { GetRunResponse } from "../lib/github/schemas";
import { Result, err, ok } from "../types";
import { getUser } from "./users.service";

type LatestDeploymentData =
  | IDeploymentData
  | Record<keyof IDeploymentData, null>;

export const getCurrentStatus = async (
  user: IUser
): Promise<ICurrentDeploymentStatus> => {
  const client = github();
  const latestDeployment = await getLatestDeployment();

  if (
    latestDeployment?.status === "PENDING" ||
    latestDeployment?.status === "RUNNING"
  ) {
    const updatedRun = await client.getWorkflowRun(
      latestDeployment.runIdentifier
    );
    if (!updatedRun.isOk()) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }

    await query({
      sql: "UPDATE deployments SET status_id=? WHERE run_identifier=?",
      values: [
        parseGithubStatusToDeploymentStatus(updatedRun.value.status),
        updatedRun.value.id,
      ],
    }).execute();

    const run = await getLatestDeployment();
    return { status: "occupied", run };
  }

  const workflows = await client.getActiveWorkflows();
  if (workflows.length === 1) {
    await query({
      sql: "REPLACE INTO deployments (run_identifier, person_id, status_id) VALUES (?, ?, ?)",
      values: [
        workflows[0].id,
        user.id,
        parseGithubStatusToDeploymentStatus(workflows[0].status),
      ],
    }).execute();

    const run = await getLatestDeployment();
    return { status: "occupied", run };
  } else if (workflows.length > 1) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Should not have many workflow runs at the same time.",
    });
  }

  return { status: "available" };
};

const getLatestDeployment = async (): Promise<IDeployment | null> => {
  const latestDeployment = await query<LatestDeploymentData>({
    sql: "SELECT * FROM latest_deployment",
  }).single();
  if (!latestDeployment.isOk()) {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }
  return latestDeployment.value.id
    ? parseDeployment(latestDeployment.value)
    : null;
};

export const getPreviousDeployments = async (): Promise<
  Result<IDeployment[]>
> => {
  const previousDeployments = await query<IDeploymentData>({
    sql: "SELECT * FROM deployments WHERE status_id >= 2 ORDER BY `timestamp` DESC",
  }).execute();
  if (!previousDeployments.isOk()) {
    return err(previousDeployments.error);
  }

  const people: Record<number, IUser> = {};
  for (const deployment of previousDeployments.value) {
    if (!people[deployment.person_id]) {
      const person = await getUser().fromId(deployment.person_id);
      if (!person.isOk()) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not find the user associated with this deployment",
        });
      }

      people[deployment.person_id] = person.value;
    }
  }

  const parsedDeployments = previousDeployments.value.map((deployment) => ({
    person: people[deployment.person_id],
    timestamp: deployment.timestamp,
    runIdentifier: deployment.run_identifier,
    status: parseDeploymentStatus(deployment.status_id),
  }));

  return ok(parsedDeployments);
};

export const deployWebsite = async (user: IUser): Promise<Result<number>> => {
  if ((await getCurrentStatus(user)).status !== "available") {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Cannot launch a new deployment when one is alreay active.",
    });
  }

  const runId = await github().dispatchWorkflow("manual-production.yml");
  if (!runId.isOk()) {
    return err(runId.error);
  }

  const result = await query({
    sql: "INSERT INTO deployments (run_identifier, person_id) VALUES(?, ?)",
    values: [runId.value, user.id],
  }).execute();
  if (!result.isOk()) {
    return err(result.error);
  }

  return runId;
};

const parseDeployment = async <T extends IDeploymentData | IDeploymentData[]>(
  data: T
): Promise<T extends IDeploymentData[] ? IDeployment[] : IDeployment> => {
  const people: Record<number, IUser> = {};
  const dataArray: IDeploymentData[] = Array.isArray(data) ? data : [data];

  for (const deploymentData of dataArray) {
    if (!people[deploymentData.person_id]) {
      const person = await getUser().fromId(deploymentData.person_id);
      if (!person.isOk()) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not find the user associated with this deployment",
        });
      }
      people[deploymentData.person_id] = person.value;
    }
  }

  const parsedData = dataArray.map((deploymentData) => ({
    person: people[deploymentData.person_id],
    timestamp: deploymentData.timestamp,
    runIdentifier: deploymentData.run_identifier,
    status: parseDeploymentStatus(deploymentData.status_id),
  }));

  return (
    Array.isArray(data) ? parsedData : parsedData[0]
  ) as T extends IDeploymentData[] ? IDeployment[] : IDeployment;
};

const parseDeploymentStatus = (statusId: number): IDeploymentStatus => {
  switch (statusId) {
    case 0:
      return "PENDING";
    case 1:
      return "RUNNING";
    case 2:
      return "SUCCESS";
    case 3:
    default:
      return "FAILED";
  }
};

const parseGithubStatusToDeploymentStatus = (
  githubStatus: z.infer<typeof GetRunResponse>["data"]["status"]
): number => {
  switch (githubStatus) {
    case "queued":
    case "action_required":
    case "requested":
    case "waiting":
    case "pending":
      return 0;
    case "in_progress":
      return 1;
    case "success":
    case "completed":
      return 2;
    default:
      return 3;
  }
};
