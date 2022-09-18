import {
  ContactAddress,
  ContactForm,
  Map,
  Page,
  PageSection,
} from "@trampo/components";

export default function Contact() {
  return (
    <Page title="Nous joindre">
      <PageSection className="contactMap">
        <Map latitude={46.348917} longitude={-72.538476} zoom={15} />
      </PageSection>

      <PageSection>
        <ContactAddress
          email="coordo.trampoline.intercite@gmail.com"
          phone="8198402950"
        />
      </PageSection>

      <PageSection>
        <ContactForm />
      </PageSection>
    </Page>
  );
}
