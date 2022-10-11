import classNames from "classnames";
import { ReactNode } from "react";

interface IProps {
  className?: string;
  children: ReactNode | ReactNode[];
}

export const Card = ({ className, children }: IProps) => {
  return <div className={classNames("card", className)}>{children}</div>;
};
