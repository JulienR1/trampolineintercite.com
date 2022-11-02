import { Range } from "@trampo/types";

import { IImage } from "./image";
import { IOffday } from "./offday";

export interface ICourse {
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
    courseCount: number | Range<number>;
    timespan: Range<Date>;
    offdays: IOffday[];
  };
}
