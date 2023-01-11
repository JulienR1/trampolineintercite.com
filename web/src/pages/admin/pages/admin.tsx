import { Outlet, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQueryParams } from "../hooks/use-query-params";
import { rootRoute } from "../__root";

const Admin = () => {
  const router = useRouter();
  const { redirect } = useQueryParams(["redirect"]);

  useEffect(() => {
    if (redirect) {
      router.navigate({ to: "/admin" + redirect } as any);
    }
  }, [redirect]);

  return <Outlet />;
};

export const admin = {
  label: "Admin",
  route: rootRoute.createRoute({
    path: "/admin",
    component: Admin,
  }),
};
