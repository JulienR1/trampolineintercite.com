import {
  ContactAddress,
  ContactForm,
  Map,
  Page,
  PageSection,
} from "@trampo/components";

export default function Contact() {
  return (
    <Page title="Nous joindre" className="contact__wrapper">
      <PageSection className="contact__map">
        <Map latitude={46.348917} longitude={-72.538476} zoom={15} />
      </PageSection>

      <PageSection className="contact__address">
        <ContactAddress
          email="coordo.trampoline.intercite@gmail.com"
          phone="8198402950"
        />
      </PageSection>

      <PageSection className="contact__form">
        <ContactForm />
      </PageSection>
    </Page>
  );
}
