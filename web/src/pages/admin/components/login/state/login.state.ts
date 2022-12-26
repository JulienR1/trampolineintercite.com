import type { IAuthCredentials } from "common";
import type { ZodFormattedError } from "zod";

export type LoginState = {
  errors: ZodFormattedError<IAuthCredentials, string> | undefined;
  isDirty: boolean;
  isLoading: boolean;
  hasFailedConnection: boolean;
};
