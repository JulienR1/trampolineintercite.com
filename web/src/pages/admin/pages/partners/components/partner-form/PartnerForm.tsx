import { Button, Flex, Group, Input, Text, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { ImageType, compressImage } from "@trampo/resources/image";
import { Dropzone, DropzoneRef } from "@trampo/ui/dropzone";
import type { FormRef, InnerFormProps } from "@trampo/ui/form";
import { validateForm } from "@trampo/ui/utils/form-validation";
import {
  FormEvent,
  forwardRef,
  useImperativeHandle,
  useReducer,
  useRef,
} from "react";
import { INewPartner, NewPartner } from "../../partners.schema";
import {
  beginSubmit,
  initialState,
  onValidate,
  reducer,
  reset,
  updateLogo,
} from "./state";

export const PartnerForm = forwardRef<FormRef, InnerFormProps<INewPartner>>(
  ({ onSubmit, onBeginReset, onReset }, ref) => {
    const formRef = useRef<HTMLFormElement>(null);
    const dropzoneRef = useRef<DropzoneRef>(null);
    const datePickerId = useRef(0);

    const [state, dispatch] = useReducer(reducer, initialState);
    const { errors, showErrors, isDirty, logo } = state;

    const handleChange = () => {
      const validation = validateForm(NewPartner, formRef.current, { logo });
      dispatch(onValidate(validation));
    };

    const handleSubmit = (event: FormEvent) => {
      event.preventDefault();
      const validation = validateForm(NewPartner, formRef.current, { logo });
      dispatch(beginSubmit(validation));

      if (validation.success) {
        onSubmit(validation.data);
      }
    };

    const withValidation = (data: Record<string, unknown>) =>
      validateForm(NewPartner, formRef.current, { ...data, logo });

    const handleNewLogo = async (files: FileWithPath[]) => {
      const newLogo = files.length > 0 ? files[0] : null;
      const isRasterGraphic =
        newLogo?.type.startsWith("image/") && !newLogo.type.includes("svg");

      const compressedLogo =
        newLogo && isRasterGraphic
          ? await compressImage(newLogo, {
              maxWidth: 150,
              maxHeight: 150,
              type: newLogo.type as ImageType,
            })
          : newLogo;

      dispatch(
        updateLogo(compressedLogo, withValidation({ logo: compressedLogo })),
      );
    };

    const handleReset = () => {
      dispatch(reset());
      dropzoneRef.current?.reset();
      datePickerId.current++;
      formRef.current?.reset();
      onReset();
    };

    useImperativeHandle(ref, () => ({
      reset: () => formRef.current?.reset(),
      isDirty: () => isDirty,
    }));

    return (
      <form
        ref={formRef}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onReset={handleReset}>
        <TextInput
          label="Nom"
          name="label"
          withAsterisk
          error={showErrors && errors?.label?._errors}
        />

        <Input.Wrapper error={showErrors && errors?._errors}>
          <Group
            align="flex-start"
            mb={showErrors && errors?._errors ? "5px" : undefined}>
            <DateInput
              key={"from__" + datePickerId.current}
              label="Date de début"
              name="from"
              withAsterisk
              clearable={false}
              defaultValue={new Date()}
              error={showErrors && errors?.from?._errors}
              onChange={startDate =>
                dispatch(
                  onValidate(
                    withValidation({ from: startDate?.toString() ?? null }),
                  ),
                )
              }
            />
            <DateInput
              key={"to__" + datePickerId.current}
              label="Date de fin"
              name="to"
              error={showErrors && errors?.to?._errors}
              onChange={endDate =>
                dispatch(
                  onValidate(
                    withValidation({ to: endDate?.toString() ?? null }),
                  ),
                )
              }
            />
          </Group>
        </Input.Wrapper>

        <TextInput
          withAsterisk
          label="Site web"
          name="websiteUrl"
          error={showErrors && errors?.websiteUrl?._errors}
        />

        <Dropzone
          ref={dropzoneRef}
          dropzoneProps={{
            maxFiles: 1,
            maxSize: 3 * 1024 ** 2,
            accept: IMAGE_MIME_TYPE,
          }}
          label="Logo"
          withAsterisk
          error={showErrors && errors?.logo?._errors}
          style={{ maxWidth: "390px" }}
          onFiles={handleNewLogo}
        />

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
