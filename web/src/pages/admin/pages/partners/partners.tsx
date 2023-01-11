import { Button, Container, Flex, Modal, Text, Title } from "@mantine/core";
import { client } from "@trampo/resources/client";
import { useTrpcErrorHandler } from "@trampo/resources/client/trpc-error-handler";
import { encodeImage } from "@trampo/resources/image";
import { FormConfirmation, FormRef } from "@trampo/ui/form";
import { useNotifications } from "@trampo/ui/notifications";
import { useCallback, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { admin } from "../admin";
import { Partner, PartnerForm } from "./components";
import type { INewPartner } from "./partners.schema";

const Partners = () => {
  const formRef = useRef<FormRef>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSubmittingNewPartner, setIsSubmittingNewPartner] = useState(false);

  const { addNotification } = useNotifications();
  const trpcErrorHandler = useTrpcErrorHandler();

  const queryClient = useQueryClient();
  const partners = useQuery(
    "partners",
    async () => await client.partners.getAllWithDetails.query().catch(() => []),
  );

  const createNewPartner = useCallback(async (partnerData: INewPartner) => {
    setIsSubmittingNewPartner(true);
    const encodedLogo = await encodeImage(partnerData.logo);

    const partnerId = await client.partners.create
      .mutate({
        label: partnerData.label,
        from: partnerData.from.toString(),
        to: partnerData.to?.toString() ?? null,
        websiteUrl: partnerData.websiteUrl,
        logo: encodedLogo,
      })
      .catch(err => {
        trpcErrorHandler(err, "Le partnenaire n'a pas pu être créé.");
        return undefined;
      });

    if (partnerId) {
      queryClient.invalidateQueries("partners");
      addNotification(
        "Succès",
        <>
          Partenaire '
          <Text span weight="bold">
            {partnerData.label}
          </Text>
          ' créé avec succès.
        </>,
      ).success();
      setShowForm(false);
    }

    setIsSubmittingNewPartner(false);
  }, []);

  const removePartner = useCallback(
    async (id: number) => {
      const success = await client.partners.remove.mutate(id);

      if (success) {
        const partner = partners.data?.find(p => p.id === id);
        addNotification(
          "Succès",
          <>
            Partenaire '
            <Text span weight="bold">
              {partner?.label}
            </Text>
            ' retiré avec succès.
          </>,
        ).success();
      }

      await queryClient.invalidateQueries("partners");
      return success;
    },
    [partners],
  );

  return (
    <>
      <Modal
        opened={showForm}
        onClose={() => formRef.current?.reset()}
        title={<Title size="h3">Ajouter un partenaire</Title>}>
        <FormConfirmation
          ref={formRef}
          form={PartnerForm}
          loading={isSubmittingNewPartner}
          onSubmit={createNewPartner}
          onReset={() => setShowForm(false)}
        />
      </Modal>

      <Button onClick={() => setShowForm(true)}>create partner</Button>

      <Container size={"min(80vw,1000px)" as any}>
        <Flex gap={"lg"} wrap="wrap" justify="center">
          {partners.data?.map((partner, i) => (
            <Partner key={i} {...partner} onDelete={removePartner} />
          ))}
        </Flex>
      </Container>
    </>
  );
};

export const partners = {
  label: "Partenaires",
  route: admin.route.createRoute({
    path: "partners",
    component: Partners,
  }),
};