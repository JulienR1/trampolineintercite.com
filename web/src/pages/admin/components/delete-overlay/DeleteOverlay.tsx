import {
  Button,
  LoadingOverlay,
  Overlay,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { Icon } from "@trampo/ui/icon";
import { FC, useCallback, useRef, useState } from "react";
import { useClickOutside } from "../../hooks/use-click-outside";
import "./DeleteOverlay.scss";

type DeleteOverlayProps = {
  elementId: number;
  visible: boolean;
  small?: boolean;
  onDelete: (id: number) => Promise<boolean>;
  onCancel: () => void;
};

export const DeleteOverlay: FC<DeleteOverlayProps> = ({
  elementId,
  visible,
  small,
  onDelete,
  onCancel,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onClickOutside = useCallback(() => onCancel(), []);
  useClickOutside(containerRef, onClickOutside);

  const handleDelete = async () => {
    setIsLoading(true);
    await onDelete(elementId);
    setIsLoading(false);
  };

  if (!visible) {
    return null;
  }

  return isLoading ? (
    <LoadingOverlay visible />
  ) : (
    <>
      <Overlay blur={3} color="black" opacity={0.7} />

      <div ref={containerRef} className="deleteOverlay__confirmation">
        <Stack justify="center" m="sm" spacing={small ? "xs" : "md"}>
          <Text
            size={(small ? "26px" : "60px") as any}
            color="white"
            align="center">
            <Icon icon="delete" />
          </Text>

          <Text
            size={small ? "md" : "lg"}
            color="white"
            weight="bold"
            align="center">
            Êtes-vous certain de supprimer cet élément?
          </Text>
          <Text
            size={"sm"}
            underline
            color="white"
            align="center"
            mx={small ? "0" : "sm"}>
            Cette action est permanente.
          </Text>

          {!small && <Space py="xs" />}

          <Stack spacing={small ? "xs" : "sm"} mx="xl">
            <Button
              color="red"
              variant="filled"
              size={small ? "xs" : "sm"}
              onClick={handleDelete}>
              <Text size={small ? "sm" : "md"} weight="bolder">
                Supprimer
              </Text>
            </Button>
            <Button
              variant="white"
              size={small ? "xs" : "sm"}
              onClick={onCancel}>
              <Text weight="bolder">Annuler</Text>
            </Button>
          </Stack>
        </Stack>
      </div>
    </>
  );
};
