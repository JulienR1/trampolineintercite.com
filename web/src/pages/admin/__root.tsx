import { createRouteConfig, Outlet } from "@tanstack/react-router";
import { AdminLayout } from "./components";

export const rootRoute = createRouteConfig({
  component: () => (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  ),
});
