import { Flex } from "@mantine/core";
import { IconLink } from "../IconLink";

export const AdminNav = () => {
  return (
    <Flex gap="xs">
      <IconLink to="/admin" icon="settings" />
      <IconLink to="/admin/partners" icon="handshake" />
    </Flex>
  );
};
