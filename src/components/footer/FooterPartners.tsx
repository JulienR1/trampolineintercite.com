import { Partner } from "@trampo/components";
import { useAsyncMemo } from "@trampo/hooks";

import { fetchPartners } from "./service";

export function FooterPartners() {
  const partners = useAsyncMemo(fetchPartners, []) ?? [];

  if (partners.length === 0) {
    return null;
  }

  return (
    <>
      <section className="footer__section">
        <h3 className="footer__content">Nos partenaires</h3>
        <ul className="footer__contentlist">
          {partners.map(partner => (
            <li key={partner.label} className="footer__partnerItem">
              <Partner
                img={partner.img}
                label={partner.label}
                websiteUrl={partner.websiteUrl}
              />
            </li>
          ))}
        </ul>
      </section>
      <hr className="footer__separator" />
    </>
  );
}
