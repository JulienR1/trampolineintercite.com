import classNames from "classnames";
import { ReactNode } from "react";

import { PageTitle } from "./PageTitle";

interface IProps {
  title?: string;
  className?: string;
  children: ReactNode | ReactNode[];
}

export const Page = ({ title, className, children }: IProps) => {
  return (
    <main className="page">
      {title && <PageTitle title={title} />}
      <div className={classNames("page__wrapper", className)}>{children}</div>
    </main>
  );
};
