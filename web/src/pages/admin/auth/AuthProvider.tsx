import { client } from "@trampo/resources/client";
import {
  getJwtToken,
  removeJwtToken,
  setJwtToken,
} from "@trampo/resources/localstorage";
import { Spinner } from "@trampo/ui/spinner";
import { FC, ReactNode, useCallback } from "react";
import { useQueryClient } from "react-query";
import { Permission } from "../components";
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

  const isLoading =
    isTokenValid.isLoading ||
    (isTokenValid.isIdle && isTokenValid.dataUpdatedAt === 0);

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
      {isLoading ? (
        <Spinner message="Connexion..." />
      ) : hasToken && isTokenValid.data ? (
        <Permission permissions={["ADMIN_PANEL"]} fallback={blocked}>
          {children}
        </Permission>
      ) : (
        fallback
      )}
    </AuthContext.Provider>
  );
};
