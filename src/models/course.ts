import { Range } from "@trampo/types";

import { IImage } from "./image";
import { IOffday } from "./offday";

export interface ICourse {
  title: string;
  subtitle?: string;
  description: string;
  img: IImage;
  schedule: {
    href: string;
  };
  registration: {
    href: string;
    isEnabled: boolean;
  };
}

export interface ICourseInstance extends ICourse {
  details: {
    cost: number;
    duration: number;
    courseCount: number;
    timespan: Range<Date>;
    offdays: IOffday[];
  };
}

export interface ISessionCourse extends ICourse {
  sessionDetails: {
    cost: number | Range<number>;
    duration: number | Range<number>;
    courseCount: number | Range<number>;
    timespan: Range<Date>;
    offdays: IOffday[];
  };
}
