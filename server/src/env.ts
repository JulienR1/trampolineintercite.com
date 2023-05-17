import * as dotenv from "dotenv";
import { z } from "zod";

const envVariables = z.object({
  DATABASE_NAME: z.string().min(1),
  DATABASE_HOST: z.string().min(1),
  DATABASE_USER: z.string().min(1),
  DATABASE_PASSWORD: z.string().min(1),
  DATABASE_PORT: z
    .string()
    .refine((num) => z.number().positive().parse(parseInt(num))),

  BUCKET_NAME: z.string().min(1),
  BUCKET_REGION: z.string().min(1),
  ACCESS_KEY: z.string().min(1),
  SECRET_ACCESS_KEY: z.string().min(1),
  S3_URL: z.string().url(),

  SENDGRID_API_KEY: z.string().min(1),
  SENDGRID_SENDER_EMAIL: z.string().email(),
  SENDGRID_DAILY_QUOTA: z
    .string()
    .refine((num) => z.number().positive().parse(parseInt(num))),

  GITHUB_DEPLOY_TOKEN: z.string().min(1),
  GITHUB_REPO_API_URL: z.string().url(),
  GITHUB_REF: z.literal("master").or(z.literal("develop")),

  REFERENCE_EMAIL: z.string().email(),
  CONTACT_URL: z.string().url(),
  LOGO_IMAGE_URL: z.string().url(),

  JWT_SECRET: z.string().min(1),
});

export const config = () => {
  dotenv.config();
  envVariables.parse(process.env);
};

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
