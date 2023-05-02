import { z } from "zod";
import { Result, err, ok } from "../types";

export const api = (
  url: string,
  options?: Omit<RequestInit, "body"> & { body?: Record<string, unknown> }
) => {
  const makeRequest = async <S extends z.Schema>(
    method: "GET" | "POST",
    schema: S
  ): Promise<Result<z.infer<S>>> => {
    try {
      const response = await fetch(url, {
        ...options,
        method,
        body: JSON.stringify(options?.body),
      });
      const data = await response.json();

      const parsedData = schema.parse(data);
      return ok(parsedData);
    } catch (error) {
      if (error instanceof Error) {
        return err(error);
      }
      return err(new Error("Could not complete request."));
    }
  };

  return {
    get: <S extends z.Schema>(schema: S) => makeRequest<S>("GET", schema),
    post: <S extends z.Schema>(schema: S) => makeRequest<S>("POST", schema),
  };
};
