import { Route } from "@trampo/routes";
import classNames from "classnames";
import Link from "next/link";

export interface IDropdownOption {
	label: string;
	href?: Route;
	onSelect?: () => void;
}

export function DropdownOption({ label, href, onSelect }: IDropdownOption) {
	const isInteractable = new Boolean(href || onSelect).valueOf();
	const className = classNames(["dropdown__option", { ["dropdown__option--interactable"]: isInteractable }]);

	if (href) {
		return (
			<Link href={`${href}`}>
				<a className={className}>{label}</a>
			</Link>
		);
	}
	if (onSelect) {
		return (
			<button className={className} onClick={() => onSelect?.()}>
				{label}
			</button>
		);
	}
	return (
		<p tabIndex={0} className={className}>
			{label}
		</p>
	);
}
