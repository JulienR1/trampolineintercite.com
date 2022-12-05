export type ImagePickerState = {
  images: {
    file: File;
    key?: string;
    isLoading: boolean;
  }[];
};

export const initialState: ImagePickerState = {
  images: [],
};
