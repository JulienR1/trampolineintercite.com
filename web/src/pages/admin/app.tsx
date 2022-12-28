import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./auth";
import { Login } from "./components";
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
        <AuthProvider fallback={<Login />}>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
};
