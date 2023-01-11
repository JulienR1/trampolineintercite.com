import { MutableRefObject, useEffect } from "react";

export const useClickOutside = (
  element: MutableRefObject<HTMLElement | null>,
  onClickOutside: () => void,
) => {
  useEffect(() => {
    const stop = (e: MouseEvent) => e.stopPropagation();

    window.addEventListener("click", onClickOutside);
    element.current?.addEventListener("click", stop);

    return () => {
      window.removeEventListener("click", onClickOutside);
      element.current?.removeEventListener("click", stop);
    };
  }, [onClickOutside]);
};
