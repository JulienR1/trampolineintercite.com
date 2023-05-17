import { randomBytes } from "crypto";
import { z } from "zod";
import { Result, err, ok } from "../../types";
import { api } from "../api";
import { GetManyRunsResponse, GetRunResponse } from "./schemas";

export class GithubClient {
  private headers = {
    "X-GitHub-Api-Version": "2022-11-28",
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${process.env.GITHUB_DEPLOY_TOKEN}`,
  };

  public async dispatchWorkflow(
    workflow: "manual-production.yml"
  ): Promise<Result<{ id: number; url: string }>> {
    const nowStr = this.formatDateForQuery(new Date());
    const workflowIdentifier = randomBytes(4).toString("hex");

    const result = await api(
      `${process.env.GITHUB_REPO_API_URL}/actions/workflows/${workflow}/dispatches`,
      {
        headers: this.headers,
        body: {
          ref: process.env.GITHUB_REF,
          inputs: {
            workflowIdentifier,
            production: process.env.GITHUB_REF === "master",
          },
        },
      }
    ).post(z.any());

    if (!result.isOk()) {
      return err(result.error);
    }

    // This is ugly, but there is no way to know when a workflow run has been received and processed by GitHub.
    // We can only poke their server until our request has been acknowledged
    const startTime = new Date().getTime();
    while (startTime - new Date().getTime() < 10 * 60 * 1000) {
      /* eslint-disable-next-line no-await-in-loop */
      const dispatchedRuns = await api(
        `${process.env.GITHUB_REPO_API_URL}/actions/workflows/${workflow}/runs?branch=master&per_page=5&created>=${nowStr}`,
        { headers: this.headers }
      ).get(GetManyRunsResponse);

      if (
        dispatchedRuns.isOk() &&
        dispatchedRuns.value.data.workflow_runs.length > 0
      ) {
        const runIndex = dispatchedRuns.value.data.workflow_runs.findIndex(
          (run) =>
            run.name === "Manual Deploy" &&
            run.steps.find((step) => step.name.includes(workflowIdentifier))
        );

        if (runIndex >= 0) {
          const run = dispatchedRuns.value.data.workflow_runs[runIndex];
          return ok({ id: run.id, url: run.html_url });
        }
      }

      /* eslint-disable-next-line no-await-in-loop */
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    return err(new Error("Could not dispatch the workflow"));
  }

  public async getWorkflowRun(
    runId: number
  ): Promise<Result<GetRunResponse["data"]>> {
    const response = await api(
      `${process.env.GITHUB_REPO_API_URL}/runs/${runId}`,
      { headers: this.headers }
    ).get(GetRunResponse);

    if (!response.isOk()) {
      return err(response.error);
    }
    return ok(response.value.data);
  }

  public async getActiveWorkflows(since?: Date) {
    const dateStr = this.formatDateForQuery(
      since ?? new Date(new Date().getTime() - 10 * 60 * 1000)
    );

    const workflows = await api(
      `${process.env.GITHUB_REPO_API_URL}/actions/runs?branch=master&per_page=10&created>=${dateStr}`,
      { headers: this.headers }
    ).get(GetManyRunsResponse);

    return workflows.isOk()
      ? workflows.value.data.workflow_runs.filter(
          (run) => run.status === "in_progress" || run.status === "queued"
        )
      : [];
  }

  private formatDateForQuery(date: Date): string {
    return date.toISOString().replace(/\.[0-9]*/, "");
  }
}
