import { Flex, Group, Text, Tooltip } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
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
      <DatePickerInput
        type="range"
        allowSingleDateInRange
        defaultValue={[new Date(), null]}
        styles={{ input: { minWidth: "200px" } }}
      />
    </Group>
  );
};
