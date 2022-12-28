import { createReactRouter } from "@tanstack/react-router";
import { AdminRoutes, adminRoutes } from "./pages";
import { adminRoute, BaseRoute, rootRoute } from "./__root";

const routeConfig = rootRoute.addChildren([
  adminRoute.addChildren(adminRoutes),
]);

export const createRouter = () => createReactRouter({ routeConfig });

declare module "@tanstack/react-router" {
  interface RegisterRouter {
    router: ReturnType<typeof createRouter>;
    routes: BaseRoute | AdminRoutes;
  }
}
