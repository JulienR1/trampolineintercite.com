import { client } from "@trampo/resources/client";
import {
  getJwtToken,
  removeJwtToken,
  setJwtToken,
} from "@trampo/resources/localstorage";
import { Spinner } from "@trampo/ui/spinner";
import { FC, ReactNode, useCallback } from "react";
import { useQueryClient } from "react-query";
import { useConnectedQuery } from "../connectivity";
import { AuthContext } from "./auth-context";
import { readJwtToken } from "./service";

type AuthProviderProps = {
  fallback: ReactNode;
  blocked: ReactNode;
  children: ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = ({
  fallback,
  blocked,
  children,
}) => {
  const queryClient = useQueryClient();
  const isTokenValid = useConnectedQuery(
    "auth",
    async () => await client.auth.validate.query().catch(() => false),
  );

  const token = getJwtToken();
  const hasToken = !!token;
  const user = hasToken ? readJwtToken(token) : undefined;

  const login = useCallback(async (email: string, password: string) => {
    const token = await client.auth.login
      .query({ email, password })
      .catch(() => undefined);
    if (token) {
      setJwtToken(token);
      queryClient.invalidateQueries("auth");
    }
    return token !== undefined;
  }, []);

  const logout = useCallback(() => {
    removeJwtToken();
    queryClient.invalidateQueries("auth");
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {isTokenValid.isLoading ? (
        <Spinner />
      ) : hasToken && isTokenValid.data ? (
        user?.permissions.includes("ADMIN_PANEL") ? (
          children
        ) : (
          blocked
        )
      ) : (
        fallback
      )}
    </AuthContext.Provider>
  );
};
