import { TextInput, TextInputProps } from "@mantine/core";
import { FC, useEffect, useState } from "react";

type ConfirmationInputProps = {
  confirmationText: string;
  onConfirmationChange: (isValid: boolean) => void;
} & TextInputProps;

export const ConfirmationInput: FC<ConfirmationInputProps> = ({
  confirmationText,
  onConfirmationChange,
  ...props
}) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    onConfirmationChange(input === confirmationText);
  }, [input]);

  return (
    <TextInput
      {...props}
      placeholder={confirmationText}
      onChange={e => setInput(e.currentTarget.value)}
    />
  );
};
