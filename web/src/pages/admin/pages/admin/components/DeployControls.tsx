import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Group,
  Modal,
  Stepper,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Permission } from "@trampo/pages/admin/components";
import { PermissionButton } from "@trampo/pages/admin/components/PermissionButton";
import { useConnectedQuery } from "@trampo/pages/admin/connectivity";
import { client } from "@trampo/resources/client";
import { Icon } from "@trampo/ui/icon";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";

export const DeployControls = () => {
  const queryClient = useQueryClient();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [processingDeployment, setIsProcessingDeployment] = useState(false);
  const [deployRunId, setDeployRunId] = useState<number | null>(null);

  const [confirmationText, setConfirmationText] = useState("");

  const currentStatus = useConnectedQuery("current-status", async () =>
    client.deploy.getDeploymentStatus.query(),
  );

  useEffect(() => {
    let interval;

    if (currentStatus.data?.status === "available") {
      queryClient.invalidateQueries("deployment-history");
      setDeployRunId(null);
    } else if (currentStatus.data?.status === "occupied") {
      interval = setInterval(() => {
        queryClient.invalidateQueries("current-status");
      }, 10_000);

      const runId = currentStatus.data.run?.runIdentifier ?? null;
      setDeployRunId(previousRunId => previousRunId ?? runId);
    }

    return () => clearInterval(interval);
  }, [currentStatus.data?.status]);

  const openModal = () => {
    setConfirmationText("");
    setShowConfirmationModal(true);
  };

  const handleDeploy = async () => {
    if (processingDeployment) {
      return;
    }

    setShowConfirmationModal(false);
    setIsProcessingDeployment(true);
    const runId = await client.deploy.startNewDeployment.mutate();
    setDeployRunId(runId);
    setIsProcessingDeployment(false);
  };

  const stepperStatus =
    currentStatus.data?.status === "occupied"
      ? currentStatus.data.run?.status === "in_progress"
        ? 1
        : ["failure", "success"].includes(currentStatus.data.run?.status ?? "")
        ? 2
        : 0
      : 0;

  return (
    <>
      <Permission permissions={["DEPLOY"]}>
        <Modal
          opened={showConfirmationModal}
          onClose={() => setShowConfirmationModal(false)}
          title={<Title order={3}>Confirmation requise</Title>}>
          <Divider />
          <Box py={"md"}>
            <Text>
              Ceci déploiera une nouvelle version du site web aux utilisateurs
              comprenant{" "}
              <Text weight={"bold"} span>
                tous les changements effectués
              </Text>
              .
            </Text>

            <Text pt={"sm"} size={"sm"}>
              <Flex align={"center"}>
                <Icon icon="error" />
                <Text span pl={"xs"}>
                  Ceci prendra quelques minutes.
                </Text>
              </Flex>
            </Text>
          </Box>
          <Divider />

          <Box py="md">
            <form onSubmit={e => e.preventDefault()}>
              <Title order={5}>Veuillez saisir 'confirmer'.</Title>
              <TextInput
                my={"sm"}
                placeholder="confirmer"
                onChange={e => setConfirmationText(e.currentTarget.value)}
              />

              <Group align="center" position="center">
                <Button
                  color="red"
                  onClick={() => setShowConfirmationModal(false)}>
                  <Text weight={"bold"} color="white">
                    Annuler
                  </Text>
                </Button>
                <Button
                  type="submit"
                  color="indigo"
                  onClick={handleDeploy}
                  disabled={confirmationText !== "confirmer"}>
                  <Text weight={"bold"} color="white">
                    Confirmer
                  </Text>
                </Button>
              </Group>
            </form>
          </Box>
        </Modal>
      </Permission>

      <Flex direction={"column"} gap={"md"}>
        <Center>
          {currentStatus.data?.status === "available" && !deployRunId && (
            <PermissionButton
              permissions={["DEPLOY"]}
              loading={processingDeployment}
              onClick={openModal}>
              Publier une mise à jour du site web
            </PermissionButton>
          )}
        </Center>

        {(processingDeployment || deployRunId) && (
          <Center>
            <Stepper active={stepperStatus} style={{ minWidth: "80%" }}>
              <Stepper.Step
                label={"Étape 1"}
                description={"Envoi de la requête"}
                loading={stepperStatus === 0}
              />
              <Stepper.Step
                label={"Étape 2"}
                description={"Compilation du site"}
                loading={stepperStatus === 1}
              />
              <Stepper.Step
                label={"Étape 3"}
                description={"Publication"}
                loading={stepperStatus === 2}
              />
            </Stepper>
          </Center>
        )}
      </Flex>
    </>
  );
};
