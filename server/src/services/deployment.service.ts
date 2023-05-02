import { TRPCError } from "@trpc/server";
import { IDeployment, IDeploymentData, IDeploymentStatus, IUser } from "common";
import { z } from "zod";
import { github, query } from "../lib";
import { GetRunResponse } from "../lib/github/schemas";
import { Result, err, ok } from "../types";
import { getUser } from "./users.service";

type LatestDeploymentData =
  | IDeploymentData
  | Record<keyof IDeploymentData, null>;

export const getLatestDeployment = async (): Promise<IDeployment | null> => {
  const latestDeploymentData = await query<LatestDeploymentData>({
    sql: "SELECT * FROM latest_deployment",
  }).single();

  if (!latestDeploymentData.isOk()) {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }
  if (latestDeploymentData.value.id === null) {
    return null;
  }

  const person = await getUser().fromId(latestDeploymentData.value.person_id);
  if (!person.isOk()) {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }

  const updatedRun = await github().getWorkflowRun(
    latestDeploymentData.value.run_identifier
  );
  if (!updatedRun.isOk()) {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }

  const statusId = parseGithubStatusToDeploymentStatus(updatedRun.value.status);
  await query({
    sql: "UPDATE deployments SET status_id=? WHERE run_identifier=?",
    values: [statusId, updatedRun.value.id],
  }).execute();

  return {
    person: person.value,
    timestamp: latestDeploymentData.value.timestamp,
    runIdentifier: latestDeploymentData.value.run_identifier,
    status: parseDeploymentStatus(statusId),
  };
};

export const getCurrentDeployment = async (): Promise<IDeployment | null> => {
  const latestDeployment = await getLatestDeployment();
  if (
    latestDeployment !== null &&
    ["PENDING", "RUNNING"].includes(latestDeployment.status)
  ) {
    return latestDeployment;
  }
  return null;
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
  if (await getCurrentDeployment()) {
    return err(
      new Error("Cannot launch a new deployment when one is alreay active.")
    );
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
