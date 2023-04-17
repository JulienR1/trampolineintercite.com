import { Card, Container, Title } from "@mantine/core";
import {
  ActivityRange,
  DeleteButton,
  DeleteOverlay,
} from "@trampo/pages/admin/components";
import type { IMessageDetails } from "common";
import { FC, useCallback, useState } from "react";

interface MessageProps extends IMessageDetails {
  onDelete: (id: number) => Promise<boolean>;
}

export const Message: FC<MessageProps> = ({ onDelete, ...message }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = useCallback(
    async (id: number) => {
      const success = await onDelete(id);
      setIsDeleting(false);
      return success;
    },
    [onDelete],
  );

  return (
    <Card
      p="md"
      shadow="md"
      withBorder
      radius="md"
      className="deleteButton__container"
      style={{ minWidth: "220px" }}
      onClick={e => e.stopPropagation()}>
      <Card.Section>
        <DeleteOverlay
          small
          visible={isDeleting}
          elementId={message.id}
          onCancel={() => setIsDeleting(false)}
          onDelete={handleDelete}
        />
      </Card.Section>

      <DeleteButton hide={isDeleting} onDelete={() => setIsDeleting(true)} />

      <Title size="h3" pt="sm">
        {message.title}
      </Title>
      <div
        style={{ minHeight: "60px" }}
        dangerouslySetInnerHTML={{ __html: message.content }}
      />

      <Card.Section pt="xs">
        <Container pb="xs" style={{ background: "rgba(0,0,0,0.025)" }}>
          <ActivityRange {...message} />
        </Container>
      </Card.Section>
    </Card>
  );
};
