import { z } from "zod";

const GithubResponse = <S extends z.Schema>(inner: S) =>
  z.object({ data: inner });

const RunStatus = z.enum([
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

export const GetManyRunsResponse = GithubResponse(
  z.object({
    workflow_runs: z.array(
      z.object({
        id: z.number().positive(),
        name: z.string().min(1),
        status: RunStatus,
        steps: z.array(
          z.object({
            name: z.string(),
          })
        ),
      })
    ),
  })
);

export const GetRunResponse = GithubResponse(
  z.object({
    id: z.number().positive(),
    name: z.string().min(1),
    status: RunStatus,
    created_at: z.string().transform((dateStr) => new Date(dateStr)),
    updated_at: z.string().transform((dateStr) => new Date(dateStr)),
    url: z.string().url(),
    html_url: z.string().url(),
  })
);

export type GetRunResponse = z.infer<typeof GetRunResponse>;
