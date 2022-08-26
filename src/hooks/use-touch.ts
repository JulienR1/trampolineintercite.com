import { useMemo } from "react";

export const useTouch = () => {
  const isTouch = useMemo(
    () =>
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0),
    [],
  );

  return { isTouch };
};
