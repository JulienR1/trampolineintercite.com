import { err, ok, Result } from "@trampo/types";

export const api = async <T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Result<T>> => {
  const headers = { "Content-Type": "application/json" };
  const response = await fetch(input, {
    ...init,
    headers: { ...headers, ...(init?.headers ?? {}) },
  });

  if (!response.ok) {
    return err(new Error("The request did not resolve correctly."));
  }

  const { error, value } = await response.json();
  if (error) {
    return err(new Error(error));
  }

  return ok(value);
};

// TODO: include timeout on requests
