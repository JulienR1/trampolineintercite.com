import classNames from "classnames";
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

import { PageTitle } from "./PageTitle";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  children: ReactNode | ReactNode[];
  id?: string;
  title?: string;
}

export const PageSection = ({
  children,
  className,
  title,
  ...props
}: IProps) => {
  return (
    <section {...props} className={classNames("page__section", className)}>
      {title && <PageTitle title={title} />}
      <div>{children}</div>
    </section>
  );
};
