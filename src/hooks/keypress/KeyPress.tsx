import { useEffect } from "react";
import { Keys } from "@trampo/resources/keys";

const useKeyPress = (keys: Keys | Keys[], onKeyPress: () => void) => {
	useEffect(() => {
		const subscribedKeys = Array.isArray(keys) ? keys : [keys];
		const subscribedKeysStr = subscribedKeys.map((key) => key.toString());

		const listenForKey = (event: KeyboardEvent) => {
			if (subscribedKeysStr.includes(event.key)) {
				onKeyPress();
			}
		};

		window.addEventListener("keydown", listenForKey);
		return () => {
			window.removeEventListener("keydown", listenForKey);
		};
	}, []);
};

export { useKeyPress };
