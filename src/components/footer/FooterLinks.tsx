import { RouterFilter, useFilteredRouter } from "@trampo/hooks";
import { secondaryRouter } from "@trampo/routes";

import { SmartLink } from "../smart-link";

interface IProps {
  routerFilter: RouterFilter;
}

export function FooterLinks({ routerFilter }: IProps) {
  const secondaryFooterRouter = useFilteredRouter(
    secondaryRouter,
    routerFilter,
  );

  return (
    <section className="foooter__section">
      <ul className="footer__contentlist">
        {secondaryFooterRouter.map(routeDetails => (
          <li key={routeDetails.route}>
            <SmartLink
              href={routeDetails.route}
              ariaLabel={routeDetails.label}
              className="footer__linkItem">
              {routeDetails.label}
            </SmartLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
