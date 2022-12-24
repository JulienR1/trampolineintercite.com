import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider, useAuth } from "./auth";
import { Login } from "./components";

const queryClient = new QueryClient();

const Logout = () => {
  const { logout } = useAuth();
  return <button onClick={logout}>logout</button>;
};

export const Dashboard = () => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ fontFamily: "inherit" }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider fallback={<Login />}>
          <p>LOGGED IN</p>
          <Logout />
        </AuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
};
