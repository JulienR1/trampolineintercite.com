import { LAPTOP } from "@trampo/resources/screen-sizes";
import { Modifier, RouteDetails, Router } from "@trampo/routes";
import { useMemo } from "react";

import { useScreenSize } from "./use-screen-size";

export type RouterFilter = {
  isHeader?: boolean;
  isFooter?: boolean;
};

export const useFilteredRouter = (router: Router, filter: RouterFilter) => {
  const { size: screenSize } = useScreenSize();

  const filteredRouter = useMemo(
    () => filterRouter(router, { ...filter, screenSize }),
    [router, filter, screenSize],
  );

  return filteredRouter;
};

export const filterRouter = (
  router: Router,
  filter: RouterFilter & { screenSize: number },
): Router => {
  return router
    .map(currentRoute =>
      isRouteValid(currentRoute, filter)
        ? currentRoute.subroutes
          ? {
              ...currentRoute,
              subroutes: filterRouter(currentRoute.subroutes, filter),
            }
          : currentRoute
        : null,
    )
    .filter(route => route !== null);
};

export const isRouteValid = (
  { modifiers }: RouteDetails,
  { isHeader, isFooter, screenSize }: RouterFilter & { screenSize: number },
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

  if (modifiers.includes(Modifier.DESKTOP_ONLY) && screenSize < LAPTOP) {
    return false;
  }

  return true;
};
