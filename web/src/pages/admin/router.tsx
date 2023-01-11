import { createReactRouter } from "@tanstack/react-router";
import { AdminRoutes, adminRoutes } from "./pages";
import { admin } from "./pages/admin";
import { rootRoute } from "./__root";

const routeConfig = rootRoute.addChildren([
  admin.route.addChildren(adminRoutes.filter(route => route !== admin.route)),
]);

export const createRouter = () => createReactRouter({ routeConfig });

declare module "@tanstack/react-router" {
  interface RegisterRouter {
    router: ReturnType<typeof createRouter>;
    routes: AdminRoutes;
  }
}
