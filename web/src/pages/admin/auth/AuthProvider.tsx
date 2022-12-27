import { client } from "@trampo/resources/client";
import {
  getJwtToken,
  removeJwtToken,
  setJwtToken,
} from "@trampo/resources/localstorage";
import { Spinner } from "@trampo/ui/spinner";
import { FC, ReactNode, useCallback } from "react";
import { useQuery, useQueryClient } from "react-query";
import { AuthContext } from "./auth-context";
import { readJwtToken } from "./service";

type AuthProviderProps = {
  fallback: ReactNode;
  children: ReactNode | ReactNode[];
};

export const AuthProvider: FC<AuthProviderProps> = ({ fallback, children }) => {
  const queryClient = useQueryClient();
  const isTokenValid = useQuery(
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
        children
      ) : (
        fallback
      )}
    </AuthContext.Provider>
  );
};
