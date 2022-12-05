import { CourseType, ICourseBase, ISessionCourse } from "@trampo/models";

import {
  getCourseBasesData,
  getCoursesInCurrentSession,
} from "./courses.repository";

export const getCourseBases = async () => {
  const bases = await getCourseBasesData();
  return bases.map(
    (base): ICourseBase => ({
      id: base.id,
      label: base.label,
      subtitle: base.subtitle,
      description: base.description,
      type: base.type,
      image: {
        src: base.img_key,
        alt: base.img_alt,
        width: base.img_width,
        height: base.img_height,
      },
    }),
  );
};

export const getCourses = async () => {
  const courses = await getCoursesInCurrentSession();
  const parsedCourses = courses.map(
    (course): ISessionCourse & { type_id: CourseType } => ({
      type_id: course.type_id,
      title: course.label,
      subtitle: course.subtitle,
      description: course.description,
      img: {
        src: course.img_key,
        alt: course.img_alt,
        height: course.img_height,
        width: course.img_width,
      },
      schedule: {
        href: "TODOOOOO!",
      },
      registration: {
        href: "TODOOOOO!",
        isEnabled: false,
        cta: "TODOOOOOO!",
      },
      details: {
        cost: { min: course.min_price, max: course.max_price },
        duration: { min: course.min_duration, max: course.max_duration },
        timespan: {
          min: new Date(course.first_date),
          max: new Date(course.last_date),
        },
      },
    }),
  );

  const noCourses = Object.keys(CourseType).reduce(
    (t, v) => ({ ...t, [v]: [] }),
    {},
  ) as Record<CourseType, ISessionCourse[]>;

  return parsedCourses.reduce(
    (allCourses, { type_id, ...currentCourse }) => ({
      ...allCourses,
      [type_id]: [...allCourses[type_id], currentCourse],
    }),
    noCourses,
  );
};
