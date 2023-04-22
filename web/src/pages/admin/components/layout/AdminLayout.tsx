import { Anchor, Breadcrumbs } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import type { FC, ReactNode } from "react";
import { useBreadcrumbs } from "../../hooks/use-breadcrumbs";
import { adminLabels } from "../../pages";
import { AdminHeader } from "./AdminHeader";

type AdminLayoutProps = {
  children: ReactNode | ReactNode[];
};

export const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <>
      <AdminHeader />

      <div style={{ margin: "0 auto", maxWidth: "min(80vw,1200px)" }}>
        <Breadcrumbs px="xl" py="md">
          {breadcrumbs.map((crumb, i) => (
            <Anchor
              key={crumb.routeId}
              component="div"
              opacity={0.75}
              variant={i === breadcrumbs.length - 1 ? "text" : "link"}>
              <Link to={crumb.routeId}>
                {adminLabels[crumb.routeId as keyof typeof adminLabels]}
              </Link>
            </Anchor>
          ))}
        </Breadcrumbs>

        <div>{children}</div>
      </div>
    </>
  );
};
