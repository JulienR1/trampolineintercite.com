import classNames from "classnames";
import { FC } from "react";

interface IProps {
  className?: string;
}

export const PageSeparator: FC<IProps> = ({ className }) => {
  return <hr className={classNames("page__separator", className)} />;
};
