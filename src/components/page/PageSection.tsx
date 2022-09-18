import classNames from "classnames";
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  children: ReactNode | ReactNode[];
}

export const PageSection = ({ children, className, ...props }: IProps) => {
  return (
    <section {...props} className={classNames("page__section", className)}>
      {children}
    </section>
  );
};
