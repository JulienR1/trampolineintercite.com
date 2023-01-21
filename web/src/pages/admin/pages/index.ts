import { admin } from "./admin";
import { messages } from "./messages";
import { partners } from "./partners";

const routes = [admin, partners, messages];

const { adminRoutes, adminLabels } = routes.reduce(
  (routes, currentRoute) => ({
    adminRoutes: [...routes.adminRoutes, currentRoute.route],
    adminLabels: {
      ...routes.adminLabels,
      [currentRoute.route.id]: currentRoute.label,
    },
  }),
  {
    adminRoutes: [] as Array<typeof routes[number]["route"]>,
    adminLabels: {} as Record<typeof routes[number]["route"]["id"], string>,
  },
);

export { adminRoutes, adminLabels };
export type AdminRoutes = typeof adminRoutes[number]["fullPath"];
