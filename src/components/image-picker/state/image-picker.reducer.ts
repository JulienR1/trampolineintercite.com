import {
  ImagePickerAction,
  ImagePickerState,
} from "@trampo/components/image-picker/state";

export const reducer = (
  state: ImagePickerState,
  action: ImagePickerAction,
): ImagePickerState => {
  switch (action.type) {
    case "PUSH":
      return {
        ...state,
        images: [
          ...state.images,
          ...action.payload.map(file => ({ file, isLoading: true })),
        ],
      };
    case "LOAD":
      return {
        ...state,
        images: state.images.map(image =>
          image.file === action.payload.file
            ? { ...image, isLoading: false, key: action.payload.key }
            : image,
        ),
      };
    case "REMOVE":
      return {
        ...state,
        images: state.images.filter(({ file }) => file !== action.payload),
      };
    default:
      return state;
  }
};
