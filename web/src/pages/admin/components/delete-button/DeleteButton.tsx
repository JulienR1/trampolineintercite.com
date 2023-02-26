import "./DeleteButton.scss";

import { Button, Text } from "@mantine/core";
import { Icon } from "@trampo/ui/icon";
import type { FC } from "react";
import { Permission } from "../permission";

interface DeleteButtonProps {
  hide: boolean;
  onDelete: () => void;
}

export const DeleteButton: FC<DeleteButtonProps> = ({ hide, onDelete }) => {
  return (
    <Permission permissions={["EDIT"]}>
      {!hide && (
        <div className="deleteButton">
          <Button px="xs" color="red" variant="filled" onClick={onDelete}>
            <Text size="md">
              <Icon icon="delete" />
            </Text>
          </Button>
        </div>
      )}
    </Permission>
  );
};
