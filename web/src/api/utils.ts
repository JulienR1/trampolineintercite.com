import { Routes } from "@trampo/routes";
import { client } from "./client";

const TOKEN_KEY = "token";

export const getJwtToken = () => localStorage.getItem(TOKEN_KEY);

export const goToLogin = () => {
  if (!window.location.pathname.includes(Routes.LOGIN)) {
    window.location.replace(Routes.LOGIN);
  }
};

export const login = async (email: string, password: string) => {
  const token = await client.auth.login
    .query({ email, password })
    .catch(() => undefined);
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    window.location.replace(Routes.ADMIN);
  }
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  goToLogin();
};
