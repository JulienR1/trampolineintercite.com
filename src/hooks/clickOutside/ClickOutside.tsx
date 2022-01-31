import { RefObject, useEffect } from "react";

const useClickOutside = (elementRef: RefObject<HTMLElement>, onClick: () => void) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!elementRef.current) {
				throw Error("No element provided for click outside event.");
			}
			if (event.target instanceof Element) {
				if (!elementRef.current.contains(event.target)) {
					onClick();
				}
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
};

export { useClickOutside };
