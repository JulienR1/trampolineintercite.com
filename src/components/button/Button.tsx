import classNames from "classnames";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

export const Button: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ className, children, ...props }) => {
  return (
    <button {...props} className={classNames("button", className)}>
      {children}
    </button>
  );
};
