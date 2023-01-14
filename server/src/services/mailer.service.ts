import { IEmailContact } from "common";
import { mail } from "../lib/mailer";
import { parseTemplate } from "../lib/template";
import { Template } from "../templates/template-registry";

export const forwardEmailToReference = async ({
  name,
  email,
  subject: mailSubject,
  message,
}: IEmailContact) => {
  const fromEmail = process.env.SENDGRID_SENDER_EMAIL;
  const targetEmail = process.env.REFERENCE_EMAIL;
  const contactUrl = process.env.CONTACT_URL ?? "Aucun url de contact fourni";
  const logoUrl = process.env.LOGO_IMAGE_URL ?? "Aucun logo fourni";

  const subject = mailSubject ?? "Aucun sujet";

  const mailBody = await parseTemplate(Template.CONTACT_MAIL, {
    date: new Date().toLocaleString("en-US"),
    logoUrl,
    contactUrl,
    name,
    email,
    subject,
    message,
  });

  return await mail({
    from: fromEmail,
    to: targetEmail,
    replyTo: email,
    subject,
    html: mailBody,
  });
};
