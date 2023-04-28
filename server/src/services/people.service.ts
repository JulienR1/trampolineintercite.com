import { IPerson, IPersonData } from "common";
import { query } from "../lib";
import { Result } from "../types";

export const getByName = ({
  firstname,
  lastname,
}: IPerson): Promise<Result<IPersonData[]>> => {
  return query<IPersonData>({
    sql: "SELECT * FROM person WHERE LOWER(firstname) LIKE CONCAT('%', ?, '%') AND LOWER(lastname) LIKE CONCAT('%', ?, '%')",
    values: [(firstname ?? "").toLowerCase(), (lastname ?? "").toLowerCase()],
  }).execute();
};
