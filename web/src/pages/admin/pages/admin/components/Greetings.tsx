import { Title } from "@mantine/core";
import { useAuth } from "../../../auth";

export const Greetings = () => {
  const currentHour = new Date().getHours();
  const { user } = useAuth();

  let greetingStr = "Bonjour";
  if (currentHour >= 6 && currentHour <= 10) {
    greetingStr = "Bon matin";
  } else if (currentHour >= 18) {
    greetingStr = "Bonsoir";
  }

  return (
    <Title order={2} py={"md"}>
      {`${greetingStr} ${user?.firstname ?? ""}`.trim()},
    </Title>
  );
};
