import type { CSSProperties } from "react";
import "./Spinner.scss";

interface IProps {
  size?: number;
  animationDuration?: number;
}

export const Spinner = ({ size = 100, animationDuration = 2 }: IProps) => {
  return (
    <div
      className="spinner"
      style={
        {
          "--size": size,
          "--duration": animationDuration,
        } as CSSProperties
      }>
      {Array.from(Array(4)).map((_, index) => (
        <div
          key={index}
          style={{ "--index": index } as CSSProperties}
          className="spinner__element"
          aria-hidden="true"
        />
      ))}
    </div>
  );
};
