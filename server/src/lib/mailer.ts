import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { err, ok, Result } from "../types";
import { query } from "./database";

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
  const queryResult = await query<{ sendgrid_calls: number }[]>({
    sql: "SELECT MIN(sendgrid_calls) AS sendgrid_calls FROM (SELECT sendgrid_calls FROM api_stats UNION ALL SELECT 0 AS sendgrid_calls LIMIT 1) AS A",
  }).single();
  if (!queryResult.isOk()) {
    return false;
  }

  const sendgridCallCount = queryResult.value[0]?.sendgrid_calls ?? 0;
  const quota = parseInt(process.env.SENDGRID_DAILY_QUOTA ?? "0") ?? 0;
  return sendgridCallCount < quota;
};

const registerSendgridCall = async () =>
  query({
    sql: `
    REPLACE INTO api_stats (sendgrid_calls)
    SELECT MIN(sendgrid_calls)+1 AS sendgrid_calls FROM (SELECT sendgrid_calls FROM api_stats WHERE \`date\` = current_date() UNION ALL SELECT 0 AS sendgrid_calls LIMIT 1) AS A;`,
  }).single();

export const mail = async (options: Mail.Options): Promise<Result<string>> => {
  const canSend = await canSendMail();
  if (!canSend) {
    return err(new Error("Daily email quota potentially exceeded."));
  }

  await registerSendgridCall();
  const transporter = makeTransporter();
  const { rejected, response } = await transporter.sendMail({
    ...options,
    from: process.env.SENDGRID_SENDER_EMAIL,
  });

  const hasFailed =
    typeof rejected === "string" ||
    (Array.isArray(rejected) && rejected.length > 0);
  return hasFailed ? err(new Error(response)) : ok(response);
};
