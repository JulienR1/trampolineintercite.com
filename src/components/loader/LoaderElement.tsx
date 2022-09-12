import { CSSProperties } from "react";

interface IProps {
  index: number;
}

export const LoaderElement = ({ index }: IProps) => {
  return (
    <div
      style={{ "--index": index } as CSSProperties}
      className="loader__element"
      aria-hidden="true"
    />
  );
};
