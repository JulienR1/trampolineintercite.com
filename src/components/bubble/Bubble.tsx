import classNames from "classnames";
import { ReactNode } from "react";

interface IProps {
  className?: string;
  children: ReactNode | ReactNode[];
}

export const Bubble = ({ className, children }: IProps) => {
  return (
    <div className="bubble__container">
      <div className={classNames("bubble", className)}>{children}</div>
    </div>
  );
};
