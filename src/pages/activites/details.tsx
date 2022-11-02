import { CourseWrapper, Page, PageSection } from "@trampo/components";
import { ICourse } from "@trampo/models";

export default function ActiviteDetails() {
  const affiliationCost = 20;
  const moneyFormatter = new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
  });

  return (
    <Page>
      <PageSection id="recreatif" title="Secteur récréatif">
        <div className="page__note">
          Noter qu&apos;une affiliation de{" "}
          {moneyFormatter.format(affiliationCost)} est obligatoire pour tous.
        </div>
        <CourseWrapper courses={[]} />
      </PageSection>

      <PageSection id="locations" title="Locations">
        <CourseWrapper courses={[]} />
      </PageSection>

      <PageSection id="competitif" title="Secteur compétitif">
        <CourseWrapper courses={[]} />
      </PageSection>
    </Page>
  );
}
