export * from "./login.action";
export * from "./login.reducer";
export * from "./login.state";

type LoginActionModule = typeof import("./login.action");
export type LoginAction = ReturnType<
  LoginActionModule[keyof LoginActionModule]
>;
