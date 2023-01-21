import { Button, Flex, Group, Text, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import type { FormRef, InnerFormProps } from "@trampo/ui/form";
import { FormEvent, forwardRef, useImperativeHandle, useRef } from "react";

export const MessageForm = forwardRef<FormRef, InnerFormProps<{}>>(
  ({ onSubmit, onBeginReset, onReset }, ref) => {
    const formRef = useRef<HTMLFormElement>(null);
    const editor = useEditor({});

    const handleSubmit = (event: FormEvent) => {
      event.preventDefault();
      onSubmit({});
    };

    const handleReset = () => {
      formRef.current?.reset();
      onReset();
    };

    useImperativeHandle(ref, () => ({
      reset: () => formRef.current?.reset(),
      isDirty: () => false,
    }));

    return (
      <form
        ref={formRef}
        // onChange={handleChange}
        onSubmit={handleSubmit}
        onReset={handleReset}>
        <TextInput
          label="Titre"
          name="title"
          withAsterisk
          //   error={showErrors && errors?.label?._errors}
        />

        <Group>
          <DatePicker
            label="Début"
            name="startDate"
            withAsterisk
            defaultValue={new Date()}
            //   error={showErrors && errors?.startDate?._errors}
          />
          <DatePicker
            label="Fin"
            name="endDate"
            withAsterisk
            //   error={showErrors && errors?.endDate?._errors}
          />
        </Group>

        <RichTextEditor editor={editor}>
          <RichTextEditor.Content />
        </RichTextEditor>

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
