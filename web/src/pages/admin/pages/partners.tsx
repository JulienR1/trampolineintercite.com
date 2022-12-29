import { Center, Group, Paper, TextInput, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { adminRoute } from "../__root";

export const Partners = () => {
  return (
    <Center style={{ transform: "translateY(30px)" }}>
      <Paper px="lg" py="md" shadow="lg">
        <form>
          <Title size={"h3"}>Ajouter un partenaire</Title>

          <TextInput label="Nom" withAsterisk />
          <TextInput label="Description" />
          <Group>
            <DatePicker label="Date de début" withAsterisk />
            <DatePicker label="Date de fin" />
          </Group>
        </form>
      </Paper>
    </Center>
  );
};

export const partnersRoute = adminRoute.createRoute({
  path: "partners",
  component: Partners,
});
