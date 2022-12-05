export * from "./image-picker.action";
export * from "./image-picker.state";
export * from "./image-picker.reducer";

type ImagePickerActionModule = typeof import("./image-picker.action");
export type ImagePickerAction = ReturnType<
  ImagePickerActionModule[keyof ImagePickerActionModule]
>;
