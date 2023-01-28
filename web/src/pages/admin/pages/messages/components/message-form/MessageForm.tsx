import { Button, Flex, Group, Input, Text, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import type { FormRef, InnerFormProps } from "@trampo/ui/form";
import { validateForm } from "@trampo/ui/utils/form-validation";
import {
  FormEvent,
  forwardRef,
  useImperativeHandle,
  useReducer,
  useRef,
} from "react";
import { INewMessage, NewMessage } from "../../message.schema";
import { TextEditor } from "../TextEditor";
import {
  initialState,
  onValidate,
  reducer,
  reset,
  setMessage,
  submit,
} from "./state";

export const MessageForm = forwardRef<FormRef, InnerFormProps<INewMessage>>(
  ({ onSubmit, onBeginReset, onReset }, ref) => {
    const formRef = useRef<HTMLFormElement>(null);
    const datePickerId = useRef(0);

    const [state, dispatch] = useReducer(reducer, initialState);
    const { errors, showErrors, isDirty, message } = state;

    const handleChange = () => {
      const validation = validateForm(NewMessage, formRef.current, {
        content: message.text,
      });
      dispatch(onValidate(validation));
    };

    const handleSubmit = (event: FormEvent) => {
      event.preventDefault();
      const validation = validateForm(NewMessage, formRef.current, {
        content: message.text,
      });
      dispatch(submit(validation));

      if (validation.success) {
        onSubmit({ ...validation.data, content: message.html });
      }
    };

    const handleReset = () => {
      dispatch(reset());
      datePickerId.current++;
      formRef.current?.reset();
      onReset();
    };

    useImperativeHandle(ref, () => ({
      reset: () => formRef.current?.reset(),
      isDirty: () => isDirty,
    }));

    const makeValidation = (data: Record<string, unknown>) =>
      dispatch(
        onValidate(
          validateForm(NewMessage, formRef.current, {
            content: message.text,
            ...data,
          }),
        ),
      );

    return (
      <form
        ref={formRef}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onReset={handleReset}>
        <TextInput
          label="Titre"
          name="title"
          withAsterisk
          error={showErrors && errors?.title?._errors}
        />

        <Input.Wrapper
          error={
            showErrors &&
            !errors?.startDate &&
            !errors?.endDate &&
            errors?._errors
          }>
          <Group align="flex-start" noWrap>
            <DatePicker
              key={"from__" + datePickerId.current}
              label="Début"
              name="startDate"
              withAsterisk
              defaultValue={new Date()}
              error={showErrors && errors?.startDate?._errors}
              onChange={startDate =>
                makeValidation({
                  startDate: startDate?.toString() ?? undefined,
                })
              }
            />
            <DatePicker
              key={"to__" + datePickerId.current}
              label="Fin"
              name="endDate"
              withAsterisk
              error={showErrors && errors?.endDate?._errors}
              onChange={endDate =>
                makeValidation({ endDate: endDate?.toString() ?? undefined })
              }
            />
          </Group>
        </Input.Wrapper>

        <Input.Wrapper
          label="Message"
          error={showErrors && errors?.content?._errors}>
          <TextEditor
            onChange={message =>
              dispatch(
                setMessage(
                  validateForm(NewMessage, formRef.current, {
                    content: message.text,
                  }),
                  message,
                ),
              )
            }
          />
        </Input.Wrapper>

        <Flex gap="md" justify="center" pt="xl">
          <Button variant="white" type="button" p="xs" onClick={onBeginReset}>
            <Text color="red" underline>
              Annuler
            </Text>
          </Button>
          <Button variant="filled" color="indigo" type="submit" p="xs">
            <Text weight="bold" color="white">
              Ajouter
            </Text>
          </Button>
        </Flex>
      </form>
    );
  },
);
