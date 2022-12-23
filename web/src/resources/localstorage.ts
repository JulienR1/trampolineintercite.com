const TOKEN_KEY = "token";

export const getJwtToken = () => localStorage.getItem(TOKEN_KEY);

export const setJwtToken = (value: string) =>
  localStorage.setItem(TOKEN_KEY, value);

export const removeJwtToken = () => localStorage.removeItem(TOKEN_KEY);
