import { IOffday } from "./offday";

export interface ISession {
  label: string;
  start: Date;
  end: Date;
  offdays: IOffday[];
}
