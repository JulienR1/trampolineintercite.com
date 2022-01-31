import { useEffect, useState } from "react";

export interface IUseTouch {
	isTouch: () => boolean;
}

const useTouch = (): IUseTouch => {
	const [isTouch, setIsTouch] = useState<boolean>(false);

	useEffect(() => {
		setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
	}, []);

	return { isTouch: () => isTouch };
};

export { useTouch };
