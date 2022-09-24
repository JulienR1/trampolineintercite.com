import { DetailedHTMLProps, InputHTMLAttributes } from "react";

import { InputElementFactory } from "./input-element-factory";

export * from "./Form";

export const TextInput = InputElementFactory<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>(props => <input {...props} />);

export const TextAreaInput = InputElementFactory<
  DetailedHTMLProps<
    InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >
>(props => <textarea {...props} />);
