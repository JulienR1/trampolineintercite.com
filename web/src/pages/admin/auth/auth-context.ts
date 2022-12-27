import type { IAuthUser } from "common";
import { createContext, useContext } from "react";

type IAuthContext = {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  user?: IAuthUser;
};

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const useAuth = () => useContext(AuthContext);
