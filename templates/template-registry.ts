export enum Template {
  CONTACT_MAIL = "contact-mail.html",
}

export type TemplateRegistry = {
  [Template.CONTACT_MAIL]: {
    date: string;
    logoUrl: string;
    contactUrl: string;
    name: string;
    email: string;
    subject: string;
    message: string;
  };
};
