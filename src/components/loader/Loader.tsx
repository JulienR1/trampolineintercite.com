import { CSSProperties } from "react";

import { LoaderElement } from "./LoaderElement";

interface IProps {
  size?: number;
  animationDuration?: number;
}

export const Loader = ({ size = 100, animationDuration = 2 }: IProps) => {
  return (
    <div
      className="loader"
      style={
        {
          "--size": size,
          "--duration": animationDuration,
        } as CSSProperties
      }>
      <LoaderElement index={0} />
      <LoaderElement index={1} />
      <LoaderElement index={2} />
      <LoaderElement index={3} />
    </div>
  );
};
