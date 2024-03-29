import { Box, Grid, Paper, Stack } from "@mantine/core";
import { AdminNav } from "./AdminNav";
import { UserMenu } from "./UserMenu";

export const AdminHeader = () => {
  return (
    <header>
      <Paper shadow="md">
        <Box px="xl" py="md">
          <Grid>
            <Grid.Col span={1} />
            <Grid.Col span={"auto"}>
              <Stack
                align={"center"}
                justify={"center"}
                style={{ height: "100%" }}>
                <AdminNav />
              </Stack>
            </Grid.Col>
            <Grid.Col span={1}>
              <Stack align={"flex-end"} justify={"center"}>
                <UserMenu />
              </Stack>
            </Grid.Col>
          </Grid>
        </Box>
      </Paper>
    </header>
  );
};
