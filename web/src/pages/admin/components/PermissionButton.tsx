import { Button, ButtonProps, Text, Tooltip } from "@mantine/core";
import { Icon } from "@trampo/ui/icon";
import type { IPermission } from "common";
import type { FC, ReactNode } from "react";
import { Permission } from "./permission/Permission";

type IPermissionButtonProps = {
  permissions: IPermission[];
  children: ReactNode;
} & import("@mantine/utils").PolymorphicComponentProps<"button", ButtonProps>;

export const PermissionButton: FC<IPermissionButtonProps> = ({
  permissions,
  children,
  ...props
}) => {
  return (
    <Permission
      permissions={permissions}
      fallback={
        <Button
          {...props}
          disabled
          variant="subtle"
          leftIcon={
            <Tooltip
              label="Contacter un administrateur pour effectuer la manoeuvre"
              position="right">
              <Text color="red">
                <Icon icon="error" />
              </Text>
            </Tooltip>
          }
          sx={{ "&[data-disabled]": { pointerEvents: "all" } }}
          onClick={event => event.preventDefault()}>
          <Text weight={"bold"} opacity={0.6}>
            {children}
          </Text>
        </Button>
      }>
      <Button color="indigo" {...props}>
        <Text weight={"bold"} color="white">
          {children}
        </Text>
      </Button>
    </Permission>
  );
};
