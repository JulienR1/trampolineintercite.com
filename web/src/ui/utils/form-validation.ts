import { getFormData } from "@trampo/ui/utils/form-data";
import type { z } from "zod";
import type { SafeParseReturnType } from "zod/lib";

export const validateForm = <
  S extends z.SomeZodObject | z.ZodEffects<z.SomeZodObject>,
>(
  schema: S,
  form: HTMLFormElement | null,
  extraData?: Record<string, unknown>,
) => {
  if (!form) {
    return { success: false } as ReturnType<S["safeParse"]>;
  }

  const formData = getFormData<z.infer<S>>(form);
  return schema.safeParse({ ...formData, ...extraData }) as ReturnType<
    S["safeParse"]
  >;
};

export const formatErrors = <I, O>(validation: SafeParseReturnType<I, O>) => {
  return !validation.success ? validation.error.format() : undefined;
};
