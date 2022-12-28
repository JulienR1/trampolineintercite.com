import { Button, Flex, Text } from "@mantine/core";
import { Link, RegisterRouter, useRouter } from "@tanstack/react-router";
import { Icon, IconProps } from "@trampo/ui/icon";
import type { FC } from "react";

type IconLinkProps = { to: RegisterRouter["routes"]; label: string } & Omit<
  IconProps,
  "className"
>;

export const IconLink: FC<IconLinkProps> = ({ to, label, icon, fontset }) => {
  const pathname = useRouter().state.currentLocation.pathname;
  const isActive = to === pathname;

  return (
    <Link to={to} key={to}>
      <Button variant={isActive ? "filled" : "subtle"} color="indigo" px="xs">
        <Flex align="center" justify="center">
          <Text
            size="sm"
            style={{ marginRight: "4px" }}
            color={isActive ? "white" : "black"}>
            <Icon icon={icon} fontset={fontset} />
          </Text>
          <Text
            weight={isActive ? "bold" : "normal"}
            color={isActive ? "white" : "black"}>
            {label}
          </Text>
        </Flex>
      </Button>
    </Link>
  );
};
