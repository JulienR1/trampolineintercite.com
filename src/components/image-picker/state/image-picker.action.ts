import { Action } from "@trampo/types/action";

export const pushFiles = (files: File[]): Action<"PUSH", File[]> => ({
  type: "PUSH",
  payload: files,
});

export const loadFile = (
  file: File,
  key: string | undefined,
): Action<"LOAD", { file: File; key: string | undefined }> => ({
  type: "LOAD",
  payload: { file, key },
});

export const removeFile = (file: File): Action<"REMOVE", File> => ({
  type: "REMOVE",
  payload: file,
});
