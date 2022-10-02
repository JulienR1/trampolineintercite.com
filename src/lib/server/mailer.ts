import { err, ok, Result } from "@trampo/types";
import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";

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

export const mail = async (options: Mail.Options): Promise<Result<string>> => {
  const transporter = makeTransporter();
  const { rejected, response } = await transporter.sendMail({
    ...options,
    from: process.env.SENDGRID_SENDER_EMAIL,
  });

  return rejected ? err(new Error(response)) : ok(response);
};
