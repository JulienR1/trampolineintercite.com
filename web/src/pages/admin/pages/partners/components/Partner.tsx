import {
  Anchor,
  Card,
  Center,
  Container,
  Divider,
  Image,
  Title,
} from "@mantine/core";
import { useAuth } from "@trampo/pages/admin/auth";
import { DeleteOverlay } from "@trampo/pages/admin/components";
import { ActivityRange } from "@trampo/pages/admin/components/ActivityRange";
import { DeleteButton } from "@trampo/pages/admin/components/delete-button/DeleteButton";
import type { IPartnerDetails } from "common";
import { FC, useState } from "react";

type PartnerProps = IPartnerDetails & {
  onDelete: (id: number) => Promise<boolean>;
};

export const Partner: FC<PartnerProps> = ({ onDelete, ...partner }) => {
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <Card
      p="lg"
      shadow="sm"
      radius="md"
      withBorder
      className="deleteButton__container"
      style={{ maxWidth: "204px" }}
      onClick={e => e.stopPropagation()}>
      <Card.Section>
        <DeleteOverlay
          visible={isDeleting}
          elementId={partner.id}
          onCancel={() => setIsDeleting(false)}
          onDelete={onDelete}
        />
      </Card.Section>

      <Card.Section>
        <Center>
          <Image
            src={partner.img.src}
            alt={partner.img.alt}
            width={200}
            height={200}
            fit={"contain"}
          />
        </Center>
      </Card.Section>

      <DeleteButton hide={isDeleting} onDelete={() => setIsDeleting(true)} />

      <Container py="sm">
        <Divider />
      </Container>

      <Title size="h5">{partner.label}</Title>

      <Anchor
        size="sm"
        href={partner.websiteUrl}
        style={{
          display: "block",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}>
        {partner.websiteUrl}
      </Anchor>

      <ActivityRange {...partner} />
    </Card>
  );
};
