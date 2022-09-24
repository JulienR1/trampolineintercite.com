export const api = async <T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T | undefined> => {
  const headers = { "Content-Type": "application/json" };
  const response = await fetch(input, {
    ...init,
    headers: { ...headers, ...(init?.headers ?? {}) },
  });

  if (response.ok) {
    const { value } = await response.json();
    return value;
  }
  return undefined;
};

// TODO: include timeout on requests
