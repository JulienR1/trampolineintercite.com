import { Button, Card, Flex, Modal, Stack, Text, Title } from "@mantine/core";
import { Permission } from "@trampo/pages/admin/components/permission";
import { client } from "@trampo/resources/client";
import { useTrpcErrorHandler } from "@trampo/resources/client/trpc-error-handler";
import { FormConfirmation, FormRef } from "@trampo/ui/form";
import { useNotifications } from "@trampo/ui/notifications";
import { useCallback, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { admin } from "../admin";
import { DateFilter, MessageForm } from "./components";
import { Message } from "./components/Message";
import type { INewMessage } from "./message.schema";

const Messages = () => {
  const formRef = useRef<FormRef>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSubmittingNewMessage, setIsSubmittingNewMessage] = useState(false);

  const { addNotification } = useNotifications();
  const trpcErrorHandler = useTrpcErrorHandler();

  const queryClient = useQueryClient();
  const messages = useQuery(
    "messages",
    async () =>
      await client.messages.getAll.query().catch(() => {
        addNotification(
          "Impossible d'obtenir les annonces du serveur",
          null,
        ).error();
        return [];
      }),
  );

  const handleSubmit = useCallback(async (messageData: INewMessage) => {
    setIsSubmittingNewMessage(true);

    const messageId = await client.messages.create
      .mutate({
        title: messageData.title,
        content: messageData.content,
        startDate: messageData.startDate,
        endDate: messageData.endDate,
      })
      .catch(err => {
        trpcErrorHandler(err, "Le message n'a pas pu être créé.");
        return undefined;
      });

    if (messageId) {
      queryClient.invalidateQueries("messages");
      addNotification("Succès", "Message créé avec succès.").success();
      setShowForm(false);
    }

    setIsSubmittingNewMessage(false);
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    const success = await client.messages.remove.mutate(id).catch(err => {
      trpcErrorHandler(err, "Impossible de supprimer l'annonce");
      return false;
    });

    if (success) {
      const message = messages.data?.find(m => m.id === id);
      addNotification(
        "Succès",
        <>
          Annonce '
          <Text span weight="bold">
            {message?.title}
          </Text>
          ' retirée avec succès.
        </>,
      ).success();
    }

    await queryClient.invalidateQueries("messages");
    return success;
  }, []);

  return (
    <>
      <Modal
        opened={showForm}
        onClose={() => formRef.current?.reset()}
        classNames={{ content: "modal--noScroll" }}
        title={<Title size="h3">Ajouter une annonce</Title>}>
        <FormConfirmation
          ref={formRef}
          form={MessageForm}
          loading={isSubmittingNewMessage}
          onSubmit={handleSubmit}
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
            {messages.data?.map(message => (
              <Message key={message.id} {...message} onDelete={handleDelete} />
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
