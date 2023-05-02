import { z } from "zod";
import { User } from "./user";

export const DeploymentStatus = z.enum([
  "PENDING",
  "RUNNING",
  "SUCCESS",
  "FAILED",
]);

export const Deployment = z.object({
  timestamp: z.date(),
  runIdentifier: z.number().positive(),
  status: DeploymentStatus,
  person: User,
});

export type IDeployment = z.infer<typeof Deployment>;
export type IDeploymentStatus = z.infer<typeof DeploymentStatus>;

export type IDeploymentData = {
  id: number;
  timestamp: Date;
  run_identifier: number;
  status_id: number;
  person_id: number;
};
