export * from "./message.action";
export * from "./message.reducer";
export * from "./message.state";

type MessageActionModule = typeof import("./message.action");
export type MessageAction = ReturnType<
  MessageActionModule[keyof MessageActionModule]
>;
