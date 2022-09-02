import { RouteDetails, router } from "./router";

type RouteLabels = { [key: string]: string };

const labelReducer = (labels: RouteLabels, currentRoute: RouteDetails) => ({
  ...labels,
  [currentRoute.route]: currentRoute.label,
  ...(currentRoute.subroutes?.reduce(labelReducer, {} as RouteLabels) ?? {}),
});

export const routeLabels = router.reduce(labelReducer, {} as RouteLabels);
