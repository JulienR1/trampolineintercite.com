import type { Action } from "@trampo/resources/action";
import type { IAuthCredentials } from "common";
import type { SafeParseReturnType } from "zod";

export const onValidate = (
  validation: SafeParseReturnType<IAuthCredentials, IAuthCredentials>,
): Action<"VALIDATION", typeof validation> => ({
  type: "VALIDATION",
  payload: validation,
});

export const onBeginSubmit = (
  validation: SafeParseReturnType<IAuthCredentials, IAuthCredentials>,
): Action<"BEGIN_SUBMIT", typeof validation> => ({
  type: "BEGIN_SUBMIT",
  payload: validation,
});

export const onCompleteSubmit = (
  success: boolean,
): Action<"COMPLETE_SUBMIT", boolean> => ({
  type: "COMPLETE_SUBMIT",
  payload: success,
});
