import type { FileWithPath } from "react-dropzone";
import type { ZodFormattedError } from "zod";
import type { INewPartner } from "../../../partners.schema";

export type PartnersState = {
  errors: ZodFormattedError<INewPartner, string> | undefined;
  showErrors: boolean;
  isDirty: boolean;
  logo: FileWithPath | null;
};

export const initialState: PartnersState = {
  errors: undefined,
  isDirty: false,
  showErrors: false,
  logo: null,
};
