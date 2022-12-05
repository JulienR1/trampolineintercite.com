import { Range } from "@trampo/types";

import { IImage } from "./image";
import { IOffday } from "./offday";

export interface ISessionCourse {
  title: string;
  subtitle?: string;
  description: string;
  img: IImage;
  schedule?: {
    href: string;
  };
  registration?: {
    cta?: string;
    href: string;
    isEnabled: boolean;
  };
  details?: {
    cost: number | Range<number>;
    duration: number | Range<number>;
    timespan: Range<Date>;
  };
}

export type ISpecificSessionCourse = ISessionCourse & {
  details: {
    courseCount: number | Range<number>;
    offdays: IOffday[];
  };
};

export interface ISessionCourseData {
  session_id: number;
  course_id: number;
  type_id: CourseType;
  label: string;
  subtitle?: string;
  description: string;
  first_date: string;
  last_date: string;
  min_price: number;
  max_price: number;
  min_duration: number;
  max_duration: number;
  img_width: number;
  img_height: number;
  img_key: string;
  img_alt: string;
}

export interface ICourseBase {
  id: number;
  label: string;
  description: string;
  subtitle: string;
  type: CourseType;
  image: IImage;
}

export interface ICourseBaseData {
  id: number;
  label: string;
  description: string;
  subtitle: string;
  type: CourseType;
  img_key: string;
  img_alt: string;
  img_width: number;
  img_height: number;
}

export enum CourseType {
  Recreative = 1,
  Competitive = 2,
  Locations = 3,
}
