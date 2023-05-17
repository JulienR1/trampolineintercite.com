import { TRPCError } from "@trpc/server";
import {
  ICurrentDeploymentStatus,
  IDeployment,
  IDeploymentData,
  IUser,
} from "common";
import { github, query } from "../lib";
import { Result, err, ok } from "../types";
import { getUser } from "./users.service";

type LatestDeploymentData =
  | IDeploymentData
  | Record<keyof IDeploymentData, null>;

export const getCurrentStatus = async (
  user: IUser,
  fetchNew = false
): Promise<ICurrentDeploymentStatus> => {
  const client = github();
  const latestDeployment = await getLatestDeployment();

  if (
    latestDeployment &&
    ["queued", "waiting", "pending", "requested", "in_progress"].includes(
      latestDeployment.status
    )
  ) {
    const updatedRun = await client.getWorkflowRun(
      latestDeployment.runIdentifier
    );
    if (!updatedRun.isOk()) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }

    await query({
      sql: "UPDATE deployments SET `status`=? WHERE run_identifier=?",
      values: [updatedRun.value.status, updatedRun.value.id],
    }).execute();

    const run = await getLatestDeployment();
    return { status: "occupied", run };
  }

  if (fetchNew) {
    const workflows = await client.getActiveWorkflows();
    if (workflows.length === 1) {
      await query({
        sql: "REPLACE INTO deployments (run_identifier, person_id, `status`, `url`) VALUES (?, ?, ?, ?)",
        values: [
          workflows[0].id,
          user.id,
          workflows[0].status,
          workflows[0].html_url,
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
    sql: "SELECT * FROM deployments WHERE `status` IN ('completed', 'failure') ORDER BY `timestamp` DESC",
  }).execute();
  if (!previousDeployments.isOk()) {
    return err(previousDeployments.error);
  }

  const parsedDeployments = await parseDeployment(previousDeployments.value);
  return ok(parsedDeployments);
};

export const deployWebsite = async (user: IUser): Promise<Result<number>> => {
  if ((await getCurrentStatus(user, true)).status !== "available") {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Cannot launch a new deployment when one is alreay active.",
    });
  }

  const run = await github().dispatchWorkflow("manual-deployment.yml");
  if (!run.isOk()) {
    return err(run.error);
  }

  const result = await query({
    sql: "INSERT INTO deployments (run_identifier, person_id, url) VALUES(?, ?, ?)",
    values: [run.value.id, user.id, run.value.url],
  }).execute();
  if (!result.isOk()) {
    return err(result.error);
  }

  return ok(run.value.id);
};

const parseDeployment = async <T extends IDeploymentData | IDeploymentData[]>(
  data: T
): Promise<T extends IDeploymentData[] ? IDeployment[] : IDeployment> => {
  const people: Record<number, IUser> = {};
  const promises: Array<Promise<unknown>> = [];
  const dataArray: IDeploymentData[] = Array.isArray(data) ? data : [data];

  for (const deployment of dataArray) {
    if (!people[deployment.person_id]) {
      promises.push(
        getUser()
          .fromId(deployment.person_id)
          .then((person) => {
            if (!person.isOk()) {
              throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message:
                  "Could not find the user associated with this deployment",
              });
            }
            people[deployment.person_id] = person.value;
          })
      );
    }
  }

  await Promise.all(promises);

  const parsedData = dataArray.map(
    (deploymentData): IDeployment => ({
      person: people[deploymentData.person_id],
      timestamp: deploymentData.timestamp,
      runIdentifier: deploymentData.run_identifier,
      status: deploymentData.status,
      url: deploymentData.url,
    })
  );

  return (
    Array.isArray(data) ? parsedData : parsedData[0]
  ) as T extends IDeploymentData[] ? IDeployment[] : IDeployment;
};
