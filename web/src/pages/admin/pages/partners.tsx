import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Icon } from "@trampo/ui/icon";
import { z } from "zod";
import { adminRoute } from "../__root";
import { useRef, useState } from "react";
import { getFormData } from "@trampo/ui/utils/form-data";
import type { ZodFormattedError } from "zod/lib";

const NewPartner = z
  .object({
    label: z.string(),
    description: z.string().optional(),
    websiteUrl: z.string().url(),
    from: z.date(),
    to: z.date().optional(),
  })
  .refine(
    obj => (obj.to ? obj.to > obj.from : true),
    "La période saisie est invalide",
  );

export const Partners = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] =
    useState<ZodFormattedError<z.infer<typeof NewPartner>, string>>();

  const handleChange = () => {
    if (!formRef.current) {
      return;
    }

    const formData = getFormData<z.infer<typeof NewPartner>>(formRef.current);
    const errors = NewPartner.safeParse(formData);
    setErrors(errors.success ? undefined : errors.error.format());
  };

  return (
    <Center style={{ transform: "translateY(30px)" }}>
      <Paper px="lg" py="md" shadow="lg">
        <form ref={formRef} onChange={handleChange}>
          <Title size={"h3"}>Ajouter un partenaire</Title>

          <TextInput label="Nom" withAsterisk />
          <TextInput label="Description" />
          <Group>
            <DatePicker label="Date de début" withAsterisk />
            <DatePicker label="Date de fin" />
          </Group>

          <TextInput label="Site web" />

          <Box py="md">
            <Dropzone
              accept={IMAGE_MIME_TYPE}
              maxSize={3 * 1024 ** 2}
              onDrop={file => console.log(file)}
              onReject={file => console.log(file)}
              maxFiles={1}>
              <Group
                position="center"
                spacing="xl"
                style={{ minHeight: 0, pointerEvents: "none" }}>
                <Dropzone.Accept>
                  <div style={{ fontSize: "2em" }}>
                    <Icon icon="upload_file" />
                  </div>
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <div style={{ fontSize: "2em" }}>
                    <Icon icon="error" />
                  </div>
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <div style={{ fontSize: "2em" }}>
                    <Icon icon="image" />
                  </div>
                </Dropzone.Idle>

                <Text size="md">Insérer le logo du partenaire ici</Text>
              </Group>
            </Dropzone>
          </Box>

          <Flex gap="md" justify="center">
            <Button variant="white" type="reset" p="xs">
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
      </Paper>
    </Center>
  );
};

export const partnersRoute = adminRoute.createRoute({
  path: "partners",
  component: Partners,
});
