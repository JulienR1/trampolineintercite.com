import "./Partner.scss";

import {
  Anchor,
  Badge,
  Button,
  Card,
  Center,
  Container,
  Divider,
  Image,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useAuth } from "@trampo/pages/admin/auth";
import { DeleteOverlay } from "@trampo/pages/admin/components";
import { Icon } from "@trampo/ui/icon";
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
      className="partner"
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

      {user?.permissions?.includes("EDIT") && !isDeleting && (
        <div className="partner__deleteButton">
          <Button
            px="xs"
            color="red"
            variant="filled"
            onClick={() => setIsDeleting(true)}>
            <Text size="md">
              <Icon icon="delete" />
            </Text>
          </Button>
        </div>
      )}

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

      <Badge
        mt={"xs"}
        fullWidth
        variant="filled"
        color={partner.isActive ? "green" : "red"}>
        {partner.isActive ? "Actif" : "Inactif"}
      </Badge>

      <Table>
        <tbody>
          <tr>
            <td>Début</td>
            <td>
              <Badge>
                {new Date(partner.startDate).toLocaleDateString("en-CA")}
              </Badge>
            </td>
          </tr>
          <tr>
            <td>Fin</td>
            <td>
              <Badge>
                {partner.endDate
                  ? new Date(partner.endDate).toLocaleDateString("en-CA")
                  : "aucune"}
              </Badge>
            </td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
};
