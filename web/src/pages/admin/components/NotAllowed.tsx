import { Box, Button, Card, Stack, Text, Title } from "@mantine/core";
import { useAuth } from "../auth";

export const NotAllowed = () => {
  const { logout } = useAuth();

  return (
    <Stack align="center" justify="center" style={{ height: "80vh" }}>
      <Card shadow="xl" withBorder style={{ width: "fit-content" }}>
        <Stack justify="center">
          <Title size="h3" align="center">
            Interdit
          </Title>
          <Box>
            <Text size="md" align="center">
              Vous n'avez pas accès au panneau d'administration.
              <br />
              Veuillez contacter un administrateur pour demander accès.
            </Text>
          </Box>
          <Button color="indigo" onClick={logout}>
            <Text weight="bold" color="white">
              Déconnexion
            </Text>
          </Button>
        </Stack>
      </Card>
    </Stack>
  );
};
