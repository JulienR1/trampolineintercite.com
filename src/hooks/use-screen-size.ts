import { useCallback, useEffect, useState } from "react";

export const useScreenSize = () => {
  const [size, setSize] = useState<number>(0);

  const updateSize = useCallback(() => {
    setSize(window.innerWidth);
  }, []);

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [updateSize]);

  return { size };
};
