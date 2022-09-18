import classNames from "classnames";

import { IconFontset } from "./IconFontSet";
import { IconName } from "./IconName";

interface IProps {
  icon: IconName;
  fontset: IconFontset;
  className?: string;
}

export function Icon({ icon, fontset, className }: IProps) {
  const iconClass = ["material-icons", fontset?.toString()].join("-");
  const allClasses = classNames(iconClass, "icon", className);
  return <span className={allClasses}>{icon ?? "Help"}</span>;
}
