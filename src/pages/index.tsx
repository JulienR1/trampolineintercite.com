import { Routes } from "@trampo/routes";
import Link from "next/link";

export default function Home() {
	return (
		<div>
			<p> Hello world! </p>
			<Link href={Routes.ABOUT}>About</Link>
			<Link href={Routes.SPORT_N_ROLL}>Sport n roll</Link>
		</div>
	);
}
