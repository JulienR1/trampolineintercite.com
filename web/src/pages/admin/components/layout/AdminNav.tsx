import { Flex } from "@mantine/core";
import { IconLink } from "../IconLink";

export const AdminNav = () => {
  return (
    <Flex gap="xs">
      <IconLink to="/admin" label="Admin" icon="settings" />
      <IconLink to="/admin/partners" label="Partenaires" icon="handshake" />
    </Flex>
  );
};
