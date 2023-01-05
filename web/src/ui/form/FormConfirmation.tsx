import { Button, Group, Modal, Text, Title } from "@mantine/core";
import type { ReactElement, Ref } from "react";
import {
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Icon } from "../icon";
import type { FormProps, FormRef, InnerFormProps } from "./types";

type FormWrapperProps<T> = FormProps<T> & {
  form: ForwardRefExoticComponent<InnerFormProps<T> & RefAttributes<FormRef>>;
};

const FormWrapper = <T extends Record<string, unknown>>(
  { onSubmit, onReset, form: Form }: FormWrapperProps<T>,
  ref: ForwardedRef<FormRef>,
) => {
  const formRef = useRef<FormRef>(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const confirmReset = useCallback(() => {
    setConfirmationOpen(false);
    formRef.current?.reset();
  }, []);

  const beginReset = useCallback(() => {
    if (formRef.current?.isDirty()) {
      setConfirmationOpen(true);
    } else {
      confirmReset();
    }
  }, [confirmReset]);

  useImperativeHandle(ref, () => ({
    isDirty: () => formRef.current?.isDirty() ?? false,
    reset: beginReset,
  }));

  return (
    <>
      <Modal
        centered
        size={"fit-content"}
        opened={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        title={
          <Group spacing="sm">
            <Text color="red" size="xl">
              <Icon icon="error" />
            </Text>
            <Title size="h4">Êtes-vous certain?</Title>
          </Group>
        }>
        <Text>Les données saisies seront perdues.</Text>
        <Group pt="md">
          <Button
            size="xs"
            variant="subtle"
            onClick={() => setConfirmationOpen(false)}>
            <Text color="red">Je change d'idée</Text>
          </Button>
          <Button color="indigo" size="xs" onClick={confirmReset}>
            <Text weight="bold" color="white">
              Je suis certain
            </Text>
          </Button>
        </Group>
      </Modal>

      <Form
        ref={formRef}
        onSubmit={onSubmit}
        onBeginReset={beginReset}
        onReset={onReset}
      />
    </>
  );
};

export const FormConfirmation = forwardRef(FormWrapper) as <
  T extends Record<string, unknown>,
>(
  p: FormWrapperProps<T> & { ref?: Ref<FormRef> },
) => ReactElement;
