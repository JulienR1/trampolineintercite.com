import { SendgridApiCalls } from "@trampo/models";
import { err, ok, Result } from "@trampo/types";
import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";

import { executeQuery } from "./database";

const makeTransporter = () => {
  return createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
      user: "apikey",
      pass: process.env.SENDGRID_API_KEY,
    },
  });
};

const canSendMail = async () => {
  const queryResult = await executeQuery<SendgridApiCalls[]>({
    sql: "SELECT sendgrid_calls FROM api_stats LIMIT 1",
  });
  if (!queryResult.isOk()) {
    return false;
  }

  const sendgridCallCount = queryResult.value[0]?.sendgrid_calls ?? 0;
  const quota = parseInt(process.env.SENDGRID_DAILY_QUOTA) ?? 0;
  return sendgridCallCount < quota;
};

const registerSendgridCall = async () => {
  await executeQuery({ sql: "CALL increment_sendgrid_api_call" });
};

export const mail = async (options: Mail.Options): Promise<Result<string>> => {
  const canSend = await canSendMail();
  if (!canSend) {
    return err(new Error("Daily email quota potentially exceeded."));
  }

  registerSendgridCall();
  const transporter = makeTransporter();
  const { rejected, response } = await transporter.sendMail({
    ...options,
    from: process.env.SENDGRID_SENDER_EMAIL,
  });

  return rejected ? err(new Error(response)) : ok(response);
};
