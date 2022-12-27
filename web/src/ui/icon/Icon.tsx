import classNames from "classnames";
import type { FC } from "react";
import type { IconFontset } from "./IconFontSet";
import type { IconName } from "./IconName";

export interface Props {
  icon: IconName;
  fontset?: IconFontset;
  className?: string;
}

export const Icon: FC<Props> = ({ icon, fontset, className }) => {
  const iconClass = ["material-icons", fontset?.toString()].join("-");
  const allClasses = classNames(iconClass, "icon", className);

  return <span className={allClasses}>{icon ?? "Help"}</span>;
};
