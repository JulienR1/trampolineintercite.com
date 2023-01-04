import { Flex, Text } from "@mantine/core";
import type { FC } from "react";
import { Icon, IconProps } from "../icon";

type DropzoneStatusProps = {
  message: string;
} & IconProps;

export const DropzoneStatus: FC<DropzoneStatusProps> = ({
  message,
  ...iconProps
}) => {
  return (
    <Flex align="center">
      <div style={{ fontSize: "2em" }}>
        <Icon {...iconProps} />
      </div>
      <Text size="md">{message}</Text>
    </Flex>
  );
};
