import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "@tanstack/react-router";
import { NotificationProvider } from "@trampo/ui/notifications";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./auth";
import { Login, NotAllowed } from "./components";
import { ConnectivityProvider } from "./connectivity";
import { createRouter } from "./router";

const queryClient = new QueryClient();
const router = createRouter();

export const App = () => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ fontFamily: "inherit" }}>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <ConnectivityProvider>
            <AuthProvider fallback={<Login />} blocked={<NotAllowed />}>
              <RouterProvider router={router} />
            </AuthProvider>
          </ConnectivityProvider>
        </NotificationProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
};
