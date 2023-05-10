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
  Title,
} from "@mantine/core";
import { Permission, PermissionButton } from "@trampo/pages/admin/components";
import { useConnectedQuery } from "@trampo/pages/admin/connectivity";
import { client } from "@trampo/resources/client";
import { Icon } from "@trampo/ui/icon";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { ConfirmationInput } from "./ConfirmationInput";

type DeployState = "idle" | "confirmation" | "deploying";

export const DeployControls = () => {
  const queryClient = useQueryClient();
  const [currentState, setCurrentState] = useState<DeployState>("idle");
  const [hasConfirmed, setHasConfirmed] = useState(false);

  const currentStatus = useConnectedQuery("current-status", async () =>
    client.deploy.getDeploymentStatus.query(),
  );

  useEffect(() => {
    if (currentState === "idle") {
      queryClient.invalidateQueries("deployment-history");
    }
  }, [currentState]);

  useEffect(() => {
    if (currentStatus.data?.status === "available") {
      setCurrentState(previousState =>
        previousState === "deploying" ? "idle" : previousState,
      );
    } else if (
      currentStatus.data?.status === "occupied" &&
      currentStatus.data.run
    ) {
      setCurrentState("deploying");
    }
  }, [currentStatus.data?.status]);

  useEffect(() => {
    const interval = setInterval(
      () => queryClient.invalidateQueries("current-status"),
      10_000,
    );
    return () => clearInterval(interval);
  }, []);

  const openModal = () =>
    setCurrentState(previousState =>
      previousState === "idle" ? "confirmation" : previousState,
    );

  const closeModal = () =>
    setCurrentState(previousState =>
      previousState === "confirmation" ? "idle" : previousState,
    );

  const handleDeploy = async () => {
    if (currentState === "confirmation") {
      setCurrentState("deploying");
      await client.deploy.startNewDeployment.mutate();
    }
  };

  const stepperStatus =
    currentStatus.data?.status === "occupied"
      ? currentStatus.data.run?.status === "in_progress"
        ? 1
        : ["failure", "success", "completed"].includes(
            currentStatus.data.run?.status ?? "",
          )
        ? 2
        : 0
      : 0;

  return (
    <>
      <Permission permissions={["DEPLOY"]}>
        <Modal
          opened={currentState === "confirmation"}
          onClose={closeModal}
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
              <ConfirmationInput
                my="sm"
                confirmationText="confirmer"
                onConfirmationChange={setHasConfirmed}
              />

              <Group align="center" position="center">
                <Button color="red" onClick={closeModal}>
                  <Text weight={"bold"} color="white">
                    Annuler
                  </Text>
                </Button>
                <Button
                  type="submit"
                  color="indigo"
                  onClick={handleDeploy}
                  disabled={!hasConfirmed}>
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
          {currentState !== "deploying" && (
            <PermissionButton
              onClick={openModal}
              permissions={["DEPLOY"]}
              loading={currentState !== "idle"}>
              Publier une mise à jour du site web
            </PermissionButton>
          )}

          {currentState === "deploying" && (
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
          )}
        </Center>
      </Flex>
    </>
  );
};
