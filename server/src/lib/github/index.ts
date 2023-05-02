import { isDev } from "../utils";
import { GithubClient } from "./github";
import { GithubClientMock } from "./github-mock";

export const github = () =>
  isDev() ? new GithubClientMock() : new GithubClient();
