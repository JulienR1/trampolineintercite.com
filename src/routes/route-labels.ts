import { RouteDetails, router } from "./router";
import type { Route } from "./routes";

type RouteLabels = { [key in Route]: string };

const labelReducer = (
  labels: RouteLabels,
  currentRoute: RouteDetails,
): RouteLabels => ({
  ...labels,
  [currentRoute.route]: currentRoute.label,
  ...(currentRoute.subroutes?.reduce(labelReducer, {} as RouteLabels) ?? {}),
});

const routeLabels = router.reduce(labelReducer, {} as RouteLabels);

export const getPageName = (page: Route) => {
  const label = routeLabels[page] ?? "";
  const formattedLabel = label ? `| ${label}` : "";
  return `Trampoline Intercité ${formattedLabel}`;
};
