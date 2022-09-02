import Link, { LinkProps } from "next/link";
import React, { PropsWithChildren } from "react";

interface IProps extends PropsWithChildren<LinkProps> {
  ariaLabel?: string;
  className?: string;
}

export function SmartLink({
  href,
  children,
  ariaLabel,
  className,
  ...props
}: IProps) {
  const isExternal = /https?:.*/g.test(href.toString());

  return isExternal ? (
    <a className={className} aria-label={ariaLabel} href={href.toString()}>
      {children}
    </a>
  ) : (
    <Link href={href} {...props}>
      <a className={className} aria-label={ariaLabel}>
        {children}
      </a>
    </Link>
  );
}
