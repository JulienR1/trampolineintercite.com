import { createReactRouter } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import { AdminRoutes, adminRoutes } from "./pages";
import { admin } from "./pages/admin/admin";

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
