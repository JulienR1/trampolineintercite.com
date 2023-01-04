export * from "./partners.action";
export * from "./partners.reducer";
export * from "./partners.state";

type PartnersActionModule = typeof import("./partners.action");
export type PartnerAction = ReturnType<
  PartnersActionModule[keyof PartnersActionModule]
>;
