import { useEffect, useState } from "react";

import { useIsMounted } from "./use-is-mounted";

export const useAsyncMemo = <T>(
  factory: () => Promise<T>,
  dependencies: unknown[],
): T | undefined => {
  const isMounted = useIsMounted();
  const [value, setValue] = useState<T>();

  useEffect(() => {
    let cancel = false;
    const promise = factory();

    if (promise === undefined || promise === null) {
      return;
    }

    promise.then(val => {
      if (!cancel && isMounted()) {
        setValue(val);
      }
    });

    return () => {
      cancel = true;
    };
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [isMounted, factory, ...dependencies]);

  return value;
};
