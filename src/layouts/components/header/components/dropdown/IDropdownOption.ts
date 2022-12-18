import type { Route } from "@trampo/routes";

export interface IDropdownOption {
  label: string;
  href: Route;
  className?: string;
}
