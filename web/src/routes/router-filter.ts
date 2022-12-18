import { Modifier, RouteDetails, Router } from "./router";

export type RouterFilter = {
  isHeader?: boolean;
  isFooter?: boolean;
};

export const getFilteredRouter = (router: Router, filter: RouterFilter) =>
  filterRouter(router, filter);

const filterRouter = (router: Router, filter: RouterFilter): Router => {
  return router
    .map(currentRoute => {
      const parsedRoute: RouteDetails = {
        ...currentRoute,
        className: currentRoute.modifiers?.includes(Modifier.DESKTOP_ONLY)
          ? "footer__link--desktop"
          : "",
      };

      return isRouteValid(parsedRoute, filter)
        ? parsedRoute.subroutes
          ? {
              ...parsedRoute,
              subroutes: filterRouter(parsedRoute.subroutes, filter),
            }
          : parsedRoute
        : null;
    })
    .filter(route => route !== null) as RouteDetails[];
};

const isRouteValid = (
  { modifiers }: RouteDetails,
  { isHeader, isFooter }: RouterFilter,
): boolean => {
  if (!modifiers) {
    return true;
  }

  if (modifiers.includes(Modifier.DISABLED)) {
    return false;
  }

  if (modifiers.includes(Modifier.HEADER_ONLY) && !isHeader) {
    return false;
  }

  if (modifiers.includes(Modifier.FOOTER_ONLY) && !isFooter) {
    return false;
  }

  return true;
};
