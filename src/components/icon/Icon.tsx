import classNames from "classnames";

import { IconName } from "./IconName";

export enum IconFontset {
	Outlined = "outlined",
	Round = "round",
	Sharp = "sharp",
	TwoTones = "two-tone",
}

interface IProps {
	icon: IconName;
	fontset?: IconFontset;
}

export default function Icon({ icon, fontset }: IProps) {
	const iconClass = ["material-icons", fontset?.toString()].join("-");
	const allClasses = classNames(iconClass, "icon");
	return <span className={allClasses}>{icon ?? "Help"}</span>;
}
