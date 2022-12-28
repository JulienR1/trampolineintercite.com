import { RegisterRouter, useRouter } from "@tanstack/react-router";
import type { ComponentProps } from "react";

type LinkElement = RegisterRouter["router"]["Link"];

export const Link: LinkElement = props => {
  const router = useRouter();
  return (
    <router.Link
      {...(props as ComponentProps<LinkElement>)}
      style={{ ...props.style, cursor: "pointer" }}
    />
  );
};
