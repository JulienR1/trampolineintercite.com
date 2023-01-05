export * from "./notification.action";
export * from "./notification.reducer";
export * from "./notification.state";

type NotificationActionModule = typeof import("./notification.action");
export type NotificationAction = ReturnType<
  NotificationActionModule[keyof NotificationActionModule]
>;
