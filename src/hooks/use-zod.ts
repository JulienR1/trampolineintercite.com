import { z } from "zod";

export type ZodResult<T extends z.SomeZodObject> = {
  success: boolean;
  errors?: { [key in keyof z.infer<T>]?: string[] };
};

export const useZod = <T extends z.SomeZodObject>(
  input: z.infer<T>,
  schema: T,
): ZodResult<T> => {
  const parseResult = schema.safeParse(input);
  return {
    success: parseResult.success,
    errors:
      parseResult.success === false
        ? parseResult.error.formErrors.fieldErrors
        : undefined,
  };
};
