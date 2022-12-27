import type { FC, ReactNode } from "react";
import { AdminHeader } from "./AdminHeader";

type AdminLayoutProps = {
  children: ReactNode | ReactNode[];
};

export const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  return (
    <>
      <AdminHeader />
      <div>{children}</div>
    </>
  );
};
