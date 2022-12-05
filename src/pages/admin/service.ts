import { api } from "@trampo/lib/app";
import { ICourseBase } from "@trampo/models";

export const fetchCourseBases = async () => {
  const courseBases = await api<ICourseBase[]>("/api/courses/bases");
  return courseBases.isOk() ? courseBases.value : [];
};
