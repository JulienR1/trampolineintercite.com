import { mail, parseTemplate } from "@trampo/lib/server";
import { Template } from "templates/template-registry";

export const forwardEmailToReference = async (
  senderName: string,
  senderMail: string,
  mailSubject: string | undefined,
  message: string,
) => {
  const fromEmail = process.env.SENDGRID_SENDER_EMAIL;
  const targetEmail = process.env.REFERENCE_EMAIL;
  const contactUrl = process.env.CONTACT_URL;
  const logoUrl = process.env.LOGO_IMAGE_URL;

  const subject = mailSubject ?? "Aucun sujet";

  const mailBody = await parseTemplate(Template.CONTACT_MAIL, {
    date: new Date().toLocaleString("en-US"),
    logoUrl,
    contactUrl,
    name: senderName,
    email: senderMail,
    subject,
    message,
  });

  return await mail({
    from: fromEmail,
    to: targetEmail,
    replyTo: senderMail,
    subject,
    html: mailBody,
  });
};
