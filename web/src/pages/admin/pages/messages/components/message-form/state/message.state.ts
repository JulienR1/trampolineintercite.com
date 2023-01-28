import type { ZodFormattedError } from "zod";
import type { INewMessage } from "../../../message.schema";

export type MessageState = {
  errors: ZodFormattedError<INewMessage, string> | undefined;
  showErrors: boolean;
  isDirty: boolean;
  message: { text: string; html: string };
};

export const initialState: MessageState = {
  errors: undefined,
  isDirty: false,
  showErrors: false,
  message: { text: "", html: "" },
};
