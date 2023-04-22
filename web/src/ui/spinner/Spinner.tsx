import { Title } from "@mantine/core";
import type { CSSProperties } from "react";
import "./Spinner.scss";

interface IProps {
  size?: number;
  animationDuration?: number;
  message?: string;
}

export const Spinner = ({
  size = 100,
  animationDuration = 2,
  message = "",
}: IProps) => {
  return (
    <div className="spinner">
      <div
        className="spinner__wrapper"
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
      {message.length > 0 && (
        <Title order={3} pt={"md"}>
          {message}
        </Title>
      )}
    </div>
  );
};
