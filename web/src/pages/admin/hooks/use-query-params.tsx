import { useMemo } from "react";

export const useQueryParams = <T extends string>(keys: T[]) => {
  return useMemo(() => {
    if (typeof window !== "undefined") {
      const queryParams = window.location.search.replace("?", "").split("&");
      return queryParams.reduce((allValues, queryParam) => {
        const [key, value] = queryParam.split("=");
        return { ...allValues, [key]: value };
      }, {} as Record<T, string | undefined>);
    } else {
      return keys.reduce(
        (all, key) => ({ ...all, [key]: undefined }),
        {} as Record<T, string | undefined>,
      );
    }
  }, [window, keys]);
};
