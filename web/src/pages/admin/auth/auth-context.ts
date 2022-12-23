import { createContext, useContext } from "react";

type IAuthContext = {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const useAuth = () => useContext(AuthContext);
