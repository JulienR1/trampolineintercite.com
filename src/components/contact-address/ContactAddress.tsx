import { formatPhone } from "@trampo/lib/app";

import { Icon, IconFontset, IconName } from "../icon";
import { PageSeparator } from "../page";

interface IProps {
  phone: string;
  email: string;
}

export const ContactAddress = ({ phone, email }: IProps) => {
  return (
    <>
      <h3 className="page__subtitle contactAddress__text">Église Ste-Cécile</h3>

      <p className="contactAddress__content contactAddress__content--padding">
        <span className="contactAddress__text">550 rue des Commissaires</span>
        <span className="contactAddress__text">Trois-Rivières, Québec</span>
        <span className="contactAddress__text">G9A 0C3</span>
      </p>

      <a
        href={`tel: ${formatPhone(phone, "-")}`}
        className="contactAddress__link">
        <p className="contactAddress__content contactAddress__content--icon">
          <Icon
            icon={IconName.Phone}
            fontset={IconFontset.Outlined}
            className="contactAddress__text--icon"
          />
          <span className="contactAddress__text">
            {formatPhone(phone, ".")}
          </span>
        </p>
      </a>

      <a href={`mailto: ${email}`} className="contactAddress__link">
        <p className="contactAddress__content contactAddress__content--icon">
          <Icon
            icon={IconName.Email}
            fontset={IconFontset.Outlined}
            className="contactAddress__text--icon"
          />
          <span className="contactAddress__text">{email}</span>
        </p>
      </a>

      <PageSeparator className="hide--large" />

      <p className="contactAddress__content">
        <span className="contactAddress__text">
          Bien noter, l&apos;entrée est située sur la rue St-Paul.
        </span>
      </p>
    </>
  );
};
