
export const api = async <T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T | undefined> => {
  const response = await fetch(input, init);
  if (response.ok) {
    const { value } = await response.json();
    return value;
  }
  return undefined;
};
