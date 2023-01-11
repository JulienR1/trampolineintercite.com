import { TRPCError } from "@trpc/server";
import { IAuthCredentials, IAuthUser, IUser } from "common";
import { pbkdf2, timingSafeEqual } from "crypto";
import jwt from "jsonwebtoken";
import { err, ok, Result } from "../types";
import { getUser } from "./users.service";

export const authenticateUser = () => {
  return {
    fromCredentials: async (credentials: IAuthCredentials) => {
      const user = await getUser().fromEmail(credentials.email);
      if (!user.isOk()) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const passwordState = await validatePassword(
        user.value,
        credentials.password
      );

      if (!passwordState.isOk() || !passwordState.value.valid) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: passwordState.isOk()
            ? passwordState.value.message
            : undefined,
        });
      }

      const payload: IAuthUser = {
        id: user.value.id,
        firstname: user.value.firstname,
        lastname: user.value.lastname,
        permissions: user.value.permissions,
        iat: Date.now(),
      };
      return jwt.sign(payload, getJwtSecret());
    },

    fromToken: (token: string) =>
      new Promise<number>((resolve) => {
        jwt.verify(token, getJwtSecret(), {}, (errors, payload) => {
          if (errors || !payload || typeof payload === "string") {
            throw new TRPCError({ code: "FORBIDDEN" });
          }
          return resolve(payload["id"]);
        });
      }),
  };
};

export const hashPassword = (password: string, salt: string) =>
  new Promise<Result<Buffer>>((resolve) => {
    const saltBuffer = Buffer.from(salt, "base64");
    pbkdf2(
      password,
      saltBuffer,
      100000,
      512,
      "sha512",
      (error, hashedPassword) =>
        resolve(error ? err(error) : ok(hashedPassword))
    );
  });

const validatePassword = async (
  user: IUser,
  inputPassword: string
): Promise<Result<{ valid: boolean; message?: string }>> => {
  if (!user.password) {
    return err(new Error("No credentials associated with this account"));
  }

  const [salt, storedHash] = user.password.split(".");
  const hashedPassword = await hashPassword(inputPassword, salt);
  if (!hashedPassword.isOk()) {
    return err(hashedPassword.error);
  }

  if (
    timingSafeEqual(Buffer.from(storedHash, "base64"), hashedPassword.value)
  ) {
    return ok({ valid: true });
  }
  return ok({ valid: false, message: "Invalid credentials" });
};

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Could not authenticate user",
    });
  }

  return process.env.JWT_SECRET;
};
