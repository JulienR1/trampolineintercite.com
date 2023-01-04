import type { Action } from "@trampo/resources/action";
import type { FileWithPath } from "react-dropzone";
import type { SafeParseReturnType } from "zod/lib";
import type { INewPartner } from "../../../partners.schema";

export const onValidate = (
  validation: SafeParseReturnType<any, INewPartner>,
): Action<"VALIDATE", typeof validation> => ({
  type: "VALIDATE",
  payload: validation,
});

export const updateLogo = (
  logo: FileWithPath | null,
  validation: SafeParseReturnType<any, INewPartner>,
): Action<
  "SET_LOGO",
  { logo: FileWithPath | null; validation: typeof validation }
> => ({
  type: "SET_LOGO",
  payload: { logo, validation },
});

export const beginSubmit = (
  validation: SafeParseReturnType<any, INewPartner>,
): Action<"BEGIN_SUBMIT", typeof validation> => ({
  type: "BEGIN_SUBMIT",
  payload: validation,
});

export const reset = (): Action<"RESET", undefined> => ({
  type: "RESET",
  payload: undefined,
});
