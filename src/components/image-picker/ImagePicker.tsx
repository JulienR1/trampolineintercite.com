import { ChangeEvent, useReducer } from "react";

import { ImagePreview } from "./ImagePreview";
import { deleteImage, saveImage } from "./service";
import {
  initialState,
  loadFile,
  pushFiles,
  reducer,
  removeFile,
} from "./state";

export const ImagePicker = () => {
  const [{ images }, dispatch] = useReducer(reducer, initialState);

  const handleImageSelection = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files);
    dispatch(pushFiles(files));
    await Promise.all(
      files.map(async file => {
        const key = await saveImage(file);
        dispatch(key ? loadFile(file, key) : removeFile(file));
      }),
    );
  };

  const handleDelete = (file: File) => {
    deleteImage(images.find(img => img.file === file).key);
    dispatch(removeFile(file));
  };

  return (
    <div>
      <input
        multiple
        type="file"
        accept="image/*"
        onChange={handleImageSelection}
      />
      {images.map(({ file, isLoading }, i) => (
        <ImagePreview
          key={i}
          file={file}
          isLoading={isLoading}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};
