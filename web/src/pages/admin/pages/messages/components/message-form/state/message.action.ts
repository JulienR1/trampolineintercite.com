import type { Action } from "@trampo/resources/action";
import type { SafeParseReturnType } from "zod/lib";
import type { INewMessage } from "../../../message.schema";

export const onValidate = (
  validation: SafeParseReturnType<any, INewMessage>,
): Action<"VALIDATE", typeof validation> => ({
  type: "VALIDATE",
  payload: validation,
});

export const setMessage = (
  validation: SafeParseReturnType<any, INewMessage>,
  message: { text: string; html: string },
): Action<
  "SET_MESSAGE",
  { validation: typeof validation; message: typeof message }
> => ({
  type: "SET_MESSAGE",
  payload: { validation, message },
});

export const submit = (
  validation: SafeParseReturnType<any, INewMessage>,
): Action<"SUBMIT", typeof validation> => ({
  type: "SUBMIT",
  payload: validation,
});

export const reset = (): Action<"RESET", undefined> => ({
  type: "RESET",
  payload: undefined,
});
