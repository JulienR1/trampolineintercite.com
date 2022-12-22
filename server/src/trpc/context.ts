import { inferAsyncReturnType } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { authenticateUser, getUser } from "../services";

export const createContextInner = async (token: string | undefined) => {
  if (!token) {
    return { user: undefined };
  }

  const userId = await authenticateUser().fromToken(token);
  const user = await getUser().fromId(userId);

  return { user: user.isOk() ? user.value : undefined };
};

export const createContext = async ({ req }: CreateExpressContextOptions) => {
  if (!req.headers.authorization) {
    return { user: undefined };
  }

  const token = req.headers.authorization.split(" ")[1];
  const userId = await authenticateUser().fromToken(token);
  const user = await getUser().fromId(userId);

  return { user: user.isOk() ? user.value : undefined };
};

export type Context = inferAsyncReturnType<typeof createContextInner>;
