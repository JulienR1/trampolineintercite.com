import { getCourses } from "@api/courses/courses.service";
import { CourseWrapper, Page, PageSection } from "@trampo/components";
import { CourseType } from "@trampo/models";
import { InferGetServerSidePropsType } from "next";

export const getServerSideProps = async () => {
  const courses = await getCourses();
  return { props: { courses } };
};

export default function ActiviteDetails({
  courses,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
        <CourseWrapper courses={courses[CourseType.Recreative]} />
      </PageSection>

      <PageSection id="locations" title="Locations">
        <CourseWrapper courses={courses[CourseType.Locations]} />
      </PageSection>

      <PageSection id="competitif" title="Secteur compétitif">
        <CourseWrapper courses={courses[CourseType.Recreative]} />
      </PageSection>
    </Page>
  );
}
