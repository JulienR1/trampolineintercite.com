import { client } from "@trampo/resources/client";
import {
  getJwtToken,
  removeJwtToken,
  setJwtToken,
} from "@trampo/resources/localstorage";
import { FC, ReactNode, useCallback } from "react";
import { useQuery, useQueryClient } from "react-query";
import { AuthContext } from "./auth-context";

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

  const hasToken = !!getJwtToken();

  const login = useCallback(async (email: string, password: string) => {
    const token = await client.auth.login
      .query({ email, password })
      .catch(() => undefined);
    if (token) {
      setJwtToken(token);
      queryClient.invalidateQueries("auth");
    }
  }, []);

  const logout = useCallback(() => {
    removeJwtToken();
    queryClient.invalidateQueries("auth");
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {hasToken && isTokenValid.data ? children : fallback}
    </AuthContext.Provider>
  );
};
