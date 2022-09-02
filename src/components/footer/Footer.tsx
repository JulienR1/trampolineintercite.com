import { RouterFilter } from "@trampo/hooks";

import { FooterCopyright } from "./FooterCopyright";
import { FooterLinks } from "./FooterLinks";
import { FooterNavigation } from "./FooterNavigation";
import { FooterPartners } from "./FooterPartners";

export function Footer() {
  const filter: RouterFilter = { isFooter: true };

  return (
    <footer className="footer">
      <FooterLinks routerFilter={filter} />
      <FooterNavigation routerFilter={filter} />
      <FooterPartners />
      <FooterCopyright />
    </footer>
  );
}
