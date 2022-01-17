import { useEffect } from "react";

export default function Home() {
	useEffect(() => {
		location.assign("https://www.trampolineintercite.com");
	}, []);

	return <div>Hello world!</div>;
}
