import classNames from "classnames";

import { IconFontset } from "./IconFontSet";
import { IconName } from "./IconName";

interface IProps {
  icon: IconName;
  fontset?: IconFontset;
}

export function Icon({ icon, fontset }: IProps) {
  const iconClass = ["material-icons", fontset?.toString()].join("-");
  const allClasses = classNames(iconClass, "icon");
  return <span className={allClasses}>{icon ?? "Help"}</span>;
}
