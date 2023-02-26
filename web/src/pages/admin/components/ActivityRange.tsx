import { Badge, Box, Table } from "@mantine/core";
import type { FC } from "react";

interface ActivityRangeProps {
  isActive: boolean;
  startDate: Date;
  endDate: Date | null;
}

export const ActivityRange: FC<ActivityRangeProps> = ({
  isActive,
  startDate,
  endDate,
}) => {
  return (
    <Box pt="xs">
      <Badge fullWidth variant="filled" color={isActive ? "green" : "red"}>
        {isActive ? "Actif" : "Inactif"}
      </Badge>

      <Table>
        <tbody>
          <tr>
            <td>Début</td>
            <td>
              <Badge>{startDate.toLocaleDateString("en-CA")}</Badge>
            </td>
          </tr>
          <tr>
            <td>Fin</td>
            <td>
              <Badge>
                {endDate ? endDate.toLocaleDateString("en-CA") : "aucune"}
              </Badge>
            </td>
          </tr>
        </tbody>
      </Table>
    </Box>
  );
};
