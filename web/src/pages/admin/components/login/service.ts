import { getFormData } from "@trampo/ui/utils/form-data";
import { AuthCredentials, IAuthCredentials } from "common";
import type { RefObject } from "react";

export const validateForm = (formRef: RefObject<HTMLFormElement>) => {
  if (!formRef.current) {
    return { success: false } as ReturnType<
      typeof AuthCredentials["safeParse"]
    >;
  }

  const formData = getFormData<IAuthCredentials>(formRef.current);
  return AuthCredentials.safeParse(formData);
};
