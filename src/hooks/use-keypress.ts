import { Keys } from "@trampo/resources/keys";
import { useCallback, useEffect, useMemo } from "react";

export const useKeyPress = (keys: Keys | Keys[], onKeyPress: () => void) => {
  const subscribedKeysStr = useMemo(() => {
    const subscribedKeys = Array.isArray(keys) ? keys : [keys];
    return subscribedKeys.map(key => key.toString());
  }, [keys]);

  const listenForKey = useCallback(
    (event: KeyboardEvent) => {
      if (subscribedKeysStr.includes(event.key)) {
        onKeyPress();
      }
    },
    [subscribedKeysStr, onKeyPress],
  );

  useEffect(() => {
    window.addEventListener("keydown", listenForKey);
    return () => {
      window.removeEventListener("keydown", listenForKey);
    };
  }, [listenForKey]);
};
