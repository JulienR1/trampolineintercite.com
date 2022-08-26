import { RefObject, useCallback, useEffect } from "react";

export const useClickOutside = (
  elementRef: RefObject<HTMLElement>,
  onClick: () => void,
) => {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (!elementRef.current) {
        throw Error("No element provided for click outside event.");
      }
      if (event.target instanceof Element) {
        if (!elementRef.current.contains(event.target)) {
          onClick();
        }
      }
    },
    [elementRef, onClick],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);
};
