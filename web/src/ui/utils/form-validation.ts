import { getFormData } from "@trampo/ui/utils/form-data";
import type { RefObject } from "react";
import type { z } from "zod";
import type { SafeParseReturnType } from "zod/lib";

export const validateForm = <
  S extends z.SomeZodObject | z.ZodEffects<z.SomeZodObject>,
>(
  schema: S,
  formRef: RefObject<HTMLFormElement>,
  extraData?: Record<string, unknown>,
) => {
  if (!formRef.current) {
    return { success: false } as ReturnType<S["safeParse"]>;
  }

  const formData = getFormData<z.infer<S>>(formRef.current);
  return schema.safeParse({ ...formData, ...extraData }) as ReturnType<
    S["safeParse"]
  >;
};

export const formatErrors = <I, O>(validation: SafeParseReturnType<I, O>) => {
  return !validation.success ? validation.error.format() : undefined;
};
