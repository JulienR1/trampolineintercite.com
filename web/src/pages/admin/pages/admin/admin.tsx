import { Card } from "@mantine/core";
import { Outlet, useRouter } from "@tanstack/react-router";
import { Routes } from "@trampo/routes";
import { useEffect } from "react";
import { rootRoute } from "../../__root";
import { useQueryParams } from "../../hooks/use-query-params";
import { DeployControls, DeployHistory, Greetings } from "./components";

const Admin = () => {
  const router = useRouter();
  const { redirect } = useQueryParams(["redirect"]);

  useEffect(() => {
    if (redirect) {
      router.navigate({ to: "/admin" + redirect } as any);
    }
  }, [redirect]);

  return location.pathname === Routes.ADMIN ? (
    <div style={{ justifyContent: "center" }}>
      <Greetings />
      <Card my="sm" withBorder style={{ width: "100%" }}>
        <DeployControls />
        <DeployHistory />
      </Card>

    </div>
  ) : (
    <Outlet />
  );
};

export const admin = {
  label: "Admin",
  route: rootRoute.createRoute({
    path: "/admin",
    component: Admin,
  }),
};
