import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { z } from "zod";
import { Result, err, ok } from "../../types";
import { GetRunResponse } from "./schemas";

export class GithubClientMock {
  private dir = join(process.cwd(), "github-mock");
  private workflowRuns: Record<number, z.infer<typeof GetRunResponse>["data"]> =
    {};

  constructor() {
    if (!existsSync(this.dir)) {
      mkdirSync(this.dir);
    }

    this.loadMockRuns();
  }

  public dispatchWorkflow(_: "manual-production.yml"): Promise<Result<number>> {
    let runId = 0;
    do {
      runId = Math.round(Math.random() * 1_000_000_000);
      /* eslint-disable camelcase */
      this.workflowRuns[runId] = {
        id: runId,
        created_at: new Date(),
        updated_at: new Date(),
        url: "#",
        html_url: "#",
        name: "mock-deploy-run-" + runId,
        status: "queued",
      };
      /* eslint-enable camelcase */
    } while (!this.workflowRuns[runId]);

    this.updateMockRuns();
    return Promise.resolve(ok(runId));
  }

  public getWorkflowRun(
    runId: number
  ): Promise<Result<GetRunResponse["data"]>> {
    const run = this.workflowRuns[runId];
    if (!run) {
      return Promise.resolve(
        err(new Error("The specified run could not be found"))
      );
    }

    if (run.status === "queued") {
      run.status = "in_progress";
    } else if (Math.random() > 0.8) {
      run.status = "completed";
    } else if (Math.random() > 0.8) {
      run.status = "failure";
    }

    this.updateMockRuns();
    return Promise.resolve(ok(run));
  }

  public getActiveWorkflows(_?: Date) {
    return Promise.resolve(
      Object.values(this.workflowRuns).filter(
        (run) => run.status === "queued" || run.status === "in_progress"
      )
    );
  }

  private loadMockRuns() {
    const filepath = join(this.dir, "runs.json");
    if (!existsSync(filepath)) {
      writeFileSync(filepath, "{}", "utf-8");
    }

    const runs = readFileSync(filepath, "utf-8");
    this.workflowRuns = JSON.parse(runs);
  }

  private updateMockRuns() {
    writeFileSync(
      join(this.dir, "runs.json"),
      JSON.stringify(this.workflowRuns),
      "utf-8"
    );
  }
}
