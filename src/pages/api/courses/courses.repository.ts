import { executeQuery } from "@trampo/lib/server";
import { ICourseBaseData, IOffday, ISessionCourseData } from "@trampo/models";

export const getCourseBasesData = async () => {
  const courseBases = await executeQuery<ICourseBaseData[]>({
    sql: "SELECT * FROM course_base",
  });

  if (!courseBases.isOk()) {
    // TODO: log error in database.
    return [];
  }

  return courseBases.value;
};

export const getCoursesInCurrentSession = async () => {
  const coursesData = await executeQuery<ISessionCourseData[]>({
    sql: "SELECT * FROM courses_in_current_session",
  });

  if (!coursesData.isOk()) {
    // TODO: log error in database.
    return [];
  }

  return coursesData.value;
};

export const getOffaysInCurrentSession = async () => {
  const offdays = await executeQuery<IOffday[]>({
    sql: "SELECT * FROM courses_in_current_session",
  });

  if (!offdays.isOk()) {
    // TODO: log error in database.
    return [];
  }

  return offdays.value;
};
