import classNames from "classnames";
import { ReactNode } from "react";

import { PageSeparator } from "./PageSeparator";

interface IProps {
  title: string;
  className?: string;
  children: ReactNode | ReactNode[];
}

export const Page = ({ title, className, children }: IProps) => {
  return (
    <main className="page">
      <h1 className="page__title">{title}</h1>
      <PageSeparator />
      <div className={classNames("page__wrapper", className)}>{children}</div>
    </main>
  );
};
