import { EmailContact } from "@trampo/lib/shared";
import { useCallback, useEffect, useState } from "react";

import { Form, TextAreaInput, TextInput } from "../form";
import { sendContactMail } from "./service";

enum MessageStatus {
  NONE = "none",
  SENT = "sent",
  FAILED = "failed",
}

export const ContactForm = () => {
  const [messageStatus, setMessageStatus] = useState(MessageStatus.NONE);

  const handleSubmit = useCallback(
    (formData: EmailContact) =>
      sendContactMail(
        formData,
        () => setMessageStatus(MessageStatus.SENT),
        () => setMessageStatus(MessageStatus.FAILED),
      ),
    [],
  );

  useEffect(() => {
    let timeout;
    if (messageStatus !== MessageStatus.NONE) {
      timeout = setTimeout(() => setMessageStatus(MessageStatus.NONE), 5000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [messageStatus]);

  return (
    <>
      <h3 className="page__subtitle">Questions ou commentaires..</h3>

      <Form
        zodSchema={EmailContact}
        onSubmit={handleSubmit}
        className="contactForm"
        initialValues={{ email: "", message: "", name: "", subject: "" }}>
        <TextInput
          type="text"
          name="name"
          placeholder="Nom"
          aria-label="Votre nom"
          className="contactForm__input"
        />
        <TextInput
          type="text"
          name="email"
          placeholder="Adresse courriel"
          aria-label="Votre adresse courriel"
          className="contactForm__input"
        />
        <TextInput
          type="text"
          placeholder="Sujet"
          name="subject"
          aria-label="Sujet du message"
          className="contactForm__input"
        />
        <TextAreaInput
          name="message"
          placeholder="Message"
          aria-label="Contenu du message"
          className="contactForm__input contactForm__input--area"
        />

        {messageStatus === MessageStatus.SENT && (
          <p className="contactForm__feedback contactForm__feedback--success">
            Votre message a été envoyé. Merci de nous avoir contacté!
          </p>
        )}
        {messageStatus === MessageStatus.FAILED && (
          <p className="contactForm__feedback contactForm__feedback--failed">
            Le message n&apos;a pas pu être envoyé. Veuillez réessayer ou nous
            contacter par téléphone.
          </p>
        )}

        <button type="submit" className="contactForm__button">
          Envoyer
        </button>
      </Form>
    </>
  );
};
