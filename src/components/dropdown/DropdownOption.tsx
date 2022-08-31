import { Route } from "@trampo/routes";
import classNames from "classnames";
import Link from "next/link";

export interface IDropdownOption {
  label: string;
  href?: Route;
  onClick?: () => void;
  onSelect?: () => void;
  className?: string;
}

export function DropdownOption({
  label,
  href,
  onClick,
  onSelect,
  className,
}: IDropdownOption) {
  const isInteractable = new Boolean(href || onSelect).valueOf();
  const allClassName = classNames([
    "dropdown__option",
    { "dropdown__option--interactable": isInteractable },
    className,
  ]);

  if (href) {
    return (
      <Link href={`${href}`}>
        <a className={allClassName} onClick={onClick}>
          {label}
        </a>
      </Link>
    );
  }
  if (onSelect) {
    return (
      <button
        className={allClassName}
        onClick={() => {
          onClick?.();
          onSelect?.();
        }}>
        {label}
      </button>
    );
  }
  return (
    <p tabIndex={0} className={allClassName} onClick={onClick}>
      {label}
    </p>
  );
}
