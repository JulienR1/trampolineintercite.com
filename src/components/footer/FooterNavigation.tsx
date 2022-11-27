import { RouterFilter, useFilteredRouter } from "@trampo/hooks";
import { router } from "@trampo/routes";
import Link from "next/link";

interface IProps {
  routerFilter: RouterFilter;
}

export function FooterNavigation({ routerFilter }: IProps) {
  const footerRouter = useFilteredRouter(router, routerFilter);

  return (
    <nav className="footer__section footer__section--nav">
      {footerRouter.map(routeDetails => (
        <div key={routeDetails.route} className="footer__content">
          <h4 className="footer__content footer__navigationHeader">
            <Link href={routeDetails.route}>
              <a aria-label={routeDetails.label} className="footer__link">
                {routeDetails.label}
              </a>
            </Link>
          </h4>
          {routeDetails.subroutes && (
            <ul className="footer__contentlist footer__contentlist--vertical">
              {routeDetails.subroutes.map(subroute => (
                <li key={subroute.route}>
                  <h5 className="footer__navigationItem">
                    <Link href={subroute.route}>
                      <a aria-label={subroute.label} className="footer__link">
                        {subroute.label}
                      </a>
                    </Link>
                  </h5>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </nav>
  );
}
