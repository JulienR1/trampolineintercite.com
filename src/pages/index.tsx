import { Dropdown } from "@trampo/components/dropdown";
import { Header } from "@trampo/components/header";
import { Routes } from "@trampo/routes";

export default function Home() {
	return (
		<>
			<Header />
			<div>
				<Dropdown
					title={{ label: "Dropdown title" }}
					options={[
						{ label: "item 1", href: Routes.CONTACT },
						{ label: "item 2", href: Routes.HOME },
						{ label: "item 3" },
					]}
				/>
				{/* <p> Hello world! </p>
			<Link href={Routes.HOME}>Home</Link>
			<Link href={Routes.ABOUT}>About</Link>
			<Link href={Routes.SPORT_N_ROLL}>Sport n roll</Link> */}
			</div>
		</>
	);
}
