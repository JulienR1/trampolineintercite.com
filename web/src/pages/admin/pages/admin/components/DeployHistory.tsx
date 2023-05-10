import {
  Anchor,
  Badge,
  Center,
  Grid,
  MantineColor,
  Paper,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { useConnectedQuery } from "@trampo/pages/admin/connectivity";
import { client } from "@trampo/resources/client";
import { Icon } from "@trampo/ui/icon";
import type { IRunStatus } from "common";

const formatter = new Intl.DateTimeFormat("fr-CA", {
  hour12: false,
  dateStyle: "long",
  timeStyle: "short",
});

const colors: Partial<Record<IRunStatus, MantineColor>> = {
  success: "green",
  completed: "green",
  failure: "red",
};

const statusMessages: Partial<Record<IRunStatus, MantineColor>> = {
  success: "Succès",
  completed: "Succès",
  failure: "Erreur",
};

export const DeployHistory = () => {
  const history = useConnectedQuery("deployment-history", async () =>
    client.deploy.getPreviousDeployments.query(),
  );

  return (
    <>
      <Center>
        <Title order={4}>Déploiements précédents</Title>
      </Center>

      <Space my={"md"} />

      {history.data?.length === 0 && (
        <Center>
          <Text italic color="dimmed">
            Aucun déploiement n'a été effectué
          </Text>
        </Center>
      )}

      <ul>
        {history.data?.map(deployment => (
          <li key={deployment.runIdentifier}>
            <Paper
              py="xs"
              mb="xs"
              px="md"
              shadow="sm"
              withBorder
              style={{ minWidth: "450px" }}>
              <Grid align={"center"}>
                <Grid.Col span={"content"}>
                  <div style={{ width: "80px" }}>
                    <Badge
                      variant="filled"
                      color={`${colors[deployment.status] ?? "yellow"}.3`}
                      radius={"xl"}>
                      <Text
                        weight={"bold"}
                        size={"xs"}
                        color={`${colors[deployment.status] ?? "yellow"}.9`}>
                        {statusMessages[deployment.status] ?? "Inconnu"}
                      </Text>
                    </Badge>
                  </div>
                </Grid.Col>

                <Grid.Col span={"auto"}>
                  <Center>
                    <Text>{formatter.format(deployment.timestamp)}</Text>
                  </Center>
                </Grid.Col>

                <Grid.Col span={"content"}>
                  <Center>&mdash;</Center>
                </Grid.Col>

                <Grid.Col span={"auto"}>
                  <Center>
                    <Text>
                      {deployment.person.firstname} {deployment.person.lastname}
                    </Text>
                  </Center>
                </Grid.Col>

                <Grid.Col span={"content"}>
                  <Anchor href={"#"} target="_blank">
                    <Icon icon="open_in_new" />
                  </Anchor>
                </Grid.Col>
              </Grid>
            </Paper>
          </li>
        ))}
      </ul>
    </>
  );
};
