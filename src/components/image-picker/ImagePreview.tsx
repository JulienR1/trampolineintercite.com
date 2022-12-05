import classNames from "classnames";
import Image from "next/image";
import React, { FC } from "react";

import { Icon, IconFontset, IconName } from "../icon";
import { Loader } from "../loader";

interface IProps {
  file: File;
  isLoading: boolean;
  onDelete: (file: File) => void;
}

export const ImagePreview: FC<IProps> = ({ file, isLoading, onDelete }) => {
  const handleDelete = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onDelete(file);
  };

  return (
    <div
      className={classNames("imagePreview", {
        "imagePreview--loading": isLoading,
      })}>
      <Image src={URL.createObjectURL(file)} alt={file.name} layout="fill" />

      {isLoading ? (
        <Loader size={30} />
      ) : (
        <button className="imagePreview__close" onClick={handleDelete}>
          <Icon icon={IconName.Close} fontset={IconFontset.Outlined} />
        </button>
      )}
    </div>
  );
};
