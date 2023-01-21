import { Flex, Group, Text, Tooltip } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { Icon } from "@trampo/ui/icon";

export const DateFilter = () => {
  return (
    <Group>
      <Flex gap={"2px"} align="center">
        <Text>Filtrer par date</Text>
        <Tooltip label="Affiche seulement les messages qui seront présentés au cours des dates sélectionnées.">
          <Text>
            <Icon icon="info" />
          </Text>
        </Tooltip>
      </Flex>
      <DatePicker defaultValue={new Date()} />
      <DatePicker />
    </Group>
  );
};
