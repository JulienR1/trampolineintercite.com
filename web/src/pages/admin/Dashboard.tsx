import { MantineProvider } from "@mantine/core";
import {
  createReactRouter,
  createRouteConfig,
  Outlet,
  RouterProvider,
  useRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./auth";
import { AdminLayout, Login } from "./components";
import { useQueryParams } from "./hooks/use-query-params";

const rootRoute = createRouteConfig({
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

const routeConfig = rootRoute.addChildren([adminRoute.addChildren([])]);
const router = createReactRouter({ routeConfig });

const queryClient = new QueryClient();

declare module "@tanstack/react-router" {
  interface RegisterRouter {
    router: typeof router;
  }
}

export const Dashboard = () => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ fontFamily: "inherit" }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider fallback={<Login />}>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
};
