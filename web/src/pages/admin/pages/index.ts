import { partnersRoute } from "./partners";

export const adminRoutes = [partnersRoute];

export type AdminRoutes = typeof adminRoutes[number]["fullPath"];
