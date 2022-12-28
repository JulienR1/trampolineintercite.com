import classNames from "classnames";
import type { FC } from "react";
import "./Icon.scss";
import type { IconFontset } from "./IconFontSet";
import type { IconName } from "./IconName";

export interface IconProps {
  icon: IconName;
  fontset?: IconFontset;
  className?: string;
}

export const Icon: FC<IconProps> = ({
  icon,
  fontset = "outlined",
  className,
}) => {
  const iconClass = ["material-icons", fontset?.toString()].join("-");
  const allClasses = classNames(iconClass, "icon", className);

  return <span className={allClasses}>{icon ?? "Help"}</span>;
};
