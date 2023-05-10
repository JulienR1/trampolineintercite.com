import { RunStatus } from "common";
import { z } from "zod";

const GithubResponse = <S extends z.Schema>(inner: S) =>
  z.object({ data: inner });

/* eslint-disable camelcase */
const Run = z.object({
  id: z.number().positive(),
  name: z.string().min(1),
  status: RunStatus,
  created_at: z.string().transform((dateStr) => new Date(dateStr)),
  updated_at: z.string().transform((dateStr) => new Date(dateStr)),
  url: z.string().url(),
  html_url: z.string().url(),
  steps: z.array(
    z.object({
      name: z.string(),
    })
  ),
});

export const GetManyRunsResponse = GithubResponse(
  z.object({
    workflow_runs: z.array(Run),
  })
);
/* eslint-enable camelcase */

export const GetRunResponse = GithubResponse(Run);

export type GetRunResponse = z.infer<typeof GetRunResponse>;
