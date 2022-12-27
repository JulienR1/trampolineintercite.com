import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./auth";
import { AdminLayout, Login } from "./components";

const queryClient = new QueryClient();

export const Dashboard = () => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ fontFamily: "inherit" }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider fallback={<Login />}>
          <AdminLayout>LOGGED IN</AdminLayout>
        </AuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
};
