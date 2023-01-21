import { useAuth } from "@trampo/pages/admin/auth";
import type { IPermission } from "common";
import type { FC, ReactNode } from "react";

interface PermissionProps {
  permissions: IPermission | Array<IPermission>;
  children: ReactNode;
  fallback?: ReactNode;
}

export const Permission: FC<PermissionProps> = ({
  permissions,
  children,
  fallback,
}) => {
  const { user } = useAuth();

  const permissionArray = Array.isArray(permissions)
    ? permissions
    : [permissions];
  const hasPermission = permissionArray.every(permission =>
    user?.permissions.includes(permission),
  );

  return <>{hasPermission ? children : fallback}</>;
};
