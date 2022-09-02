import { IPartner } from "@trampo/models";

import { Partner } from "../partner";

export function FooterPartners() {
  // TODO: replace with service
  const partners: IPartner[] = [
    {
      label: "Ville de Trois-Rivières",
      websiteUrl: "https://www.v3r.net/",
      img: {
        src: "https://www.v3r.net/wp-content/themes/v3r/Images/icons/logo-v3r-v2.svg",
        size: { width: 100, height: 100 },
      },
    },
  ];

  if (partners.length === 0) {
    return null;
  }

  return (
    <section className="footer__section">
      <h3 className="footer__content">Nos partenaires</h3>
      <ul className="footer__contentlist">
        {partners.map(partner => (
          <li key={partner.label} className="footer__partnerItem">
            <Partner
              img={partner.img.src}
              label={partner.label}
              websiteUrl={partner.websiteUrl}
              size={partner.img.size}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
