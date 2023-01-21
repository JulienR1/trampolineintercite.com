import { Button, Card, Flex, Modal, Stack, Text, Title } from "@mantine/core";
import { Permission } from "@trampo/pages/admin/components/permission";
import { client } from "@trampo/resources/client";
import { FormConfirmation, FormRef } from "@trampo/ui/form";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { admin } from "../admin";
import { DateFilter, MessageForm } from "./components";

const Messages = () => {
  const formRef = useRef<FormRef>(null);
  const [showForm, setShowForm] = useState(false);

  const messages = useQuery(
    "messages",
    async () => await client.messages.getAll.query(),
  );

  return (
    <>
      <Modal
        opened={showForm}
        onClose={() => formRef.current?.reset()}
        title={<Title size="h3">Ajouter une annonce</Title>}>
        <FormConfirmation
          ref={formRef}
          form={MessageForm}
          loading={false}
          onSubmit={() => setShowForm(false)}
          onReset={() => setShowForm(false)}
        />
      </Modal>

      <Stack align="center" spacing="sm">
        <Title size="h4">Gestion des annonces</Title>

        <Stack>
          <Permission permissions={"EDIT"}>
            <Button
              color="indigo"
              variant="filled"
              onClick={() => setShowForm(true)}>
              <Text weight="bold" color="white">
                Ajouter une nouvelle annonce
              </Text>
            </Button>
          </Permission>

          <DateFilter />
        </Stack>

        <Card my="sm" withBorder style={{ width: "100%" }}>
          <Flex my="sm" gap="lg" wrap="wrap" justify="center">
            {messages.data?.length === 0 && (
              <Text italic color="dimmed">
                Aucune annonce à afficher
              </Text>
            )}
            {messages.data?.map((message, i) => (
              <p key={i}>{message.id}</p>
            ))}
          </Flex>
        </Card>
      </Stack>
    </>
  );
};

export const messages = {
  label: "Annonces",
  route: admin.route.createRoute({
    path: "messages",
    component: Messages,
  }),
};
