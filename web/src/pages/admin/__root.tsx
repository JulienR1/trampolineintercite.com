import { createRouteConfig, Outlet, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { AdminLayout } from "./components";
import { useQueryParams } from "./hooks/use-query-params";

export const rootRoute = createRouteConfig({
  component: () => (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  ),
});

export const adminRoute = rootRoute.createRoute({
  path: "/admin",
  component: () => {
    const router = useRouter();
    const { redirect } = useQueryParams(["redirect"]);

    useEffect(() => {
      if (redirect) {
        router.navigate({ to: "/admin" + redirect } as any);
      }
    }, [redirect]);

    return <Outlet />;
  },
});

export type BaseRoute = typeof adminRoute["fullPath"];
