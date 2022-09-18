import { ReactNode } from "react";

import { PageSeparator } from "./PageSeparator";

interface IProps {
  title: string;
  children: ReactNode | ReactNode[];
}

export const Page = ({ title, children }: IProps) => {
  return (
    <main className="page">
      <h1 className="page__title">{title}</h1>
      <PageSeparator />
      <div className="page__wrapper">{children}</div>
    </main>
  );
};
