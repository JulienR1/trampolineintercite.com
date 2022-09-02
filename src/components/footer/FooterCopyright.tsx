import { Routes } from "@trampo/routes";

export function FooterCopyright() {
  const startYear = Number(process.env.NEXT_PUBLIC_COPYRIGHT_START) || 2020;
  const currentYear = new Date().getFullYear();

  const yearlyRange = `${startYear} ${
    currentYear > startYear ? `-${currentYear}` : ""
  }`;

  return (
    <section className="footer__section footer__section--copyright">
      <p className="footer__content">
        &copy; Trampoline Intercité {yearlyRange}
      </p>
      <span className="footer__content footer__content--desktop">|</span>
      <p className="footer__content">
        <span className="footer__content">Conception</span>
        <span className="footer__content">
          <a
            href={Routes.JROUSSEAU}
            className="footer__link"
            aria-label="Conception Julien Rousseau">
            Julien Rousseau
          </a>
        </span>
      </p>
    </section>
  );
}
