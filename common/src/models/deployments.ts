import { z } from "zod";
import { User } from "./user";

export const RunStatus = z.enum([
  "completed",
  "action_required",
  "cancelled",
  "failure",
  "neutral",
  "skipped",
  "stale",
  "success",
  "timed_out",
  "in_progress",
  "queued",
  "requested",
  "waiting",
  "pending",
]);

export const Deployment = z.object({
  timestamp: z.date(),
  runIdentifier: z.number().positive(),
  url: z.string().url().or(z.literal("#")),
  status: RunStatus,
  person: User,
});

export const CurrentDeploymentStatus = z
  .object({ status: z.literal("available") })
  .or(
    z.object({
      status: z.literal("occupied"),
      run: Deployment.or(z.null()),
    })
  );

export type IDeployment = z.infer<typeof Deployment>;
export type IRunStatus = z.infer<typeof RunStatus>;
export type ICurrentDeploymentStatus = z.infer<typeof CurrentDeploymentStatus>;

export type IDeploymentData = {
  id: number;
  url: string;
  timestamp: Date;
  run_identifier: number;
  status: IRunStatus;
  person_id: number;
};
