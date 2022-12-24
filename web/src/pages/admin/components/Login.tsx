import {
  Box,
  Button,
  Card,
  Center,
  PasswordInput,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { getFormData } from "@trampo/ui/utils/form-data";
import { AuthCredentials, IAuthCredentials } from "common";
import { FormEvent, useRef, useState } from "react";
import type { ZodFormattedError } from "zod";
import { useAuth } from "../auth";

export const Login = () => {
  const { login } = useAuth();
  const formRef = useRef<HTMLFormElement>(null);
  const [formErrors, setFormErrors] =
    useState<ZodFormattedError<IAuthCredentials, string>>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = getFormData<IAuthCredentials>(formRef.current);
      const validation = AuthCredentials.safeParse(formData);

      if (!validation.success) {
        return setFormErrors(validation.error.format());
      }

      login(formData.email, formData.password);
    }
  };

  return (
    <Box style={{ backgroundColor: "rgba(0,0,0,0.03)" }}>
      <Center style={{ height: "100vh" }}>
        <Card shadow="md" style={{ width: "350px" }}>
          <form ref={formRef} onSubmit={handleSubmit}>
            <Title size={"h3"}>Se connecter</Title>

            <TextInput
              label="Adresse courriel"
              placeholder="nom@domaine.com"
              name="email"
              error={formErrors?.email?._errors}
            />
            <PasswordInput
              label="Mot de passe"
              name="password"
              error={formErrors?.password?._errors}
            />

            <Space h="lg" />

            <Stack>
              <Button type="submit" color="indigo">
                <Text color="white" weight="bold">
                  Connexion
                </Text>
              </Button>
            </Stack>
          </form>
        </Card>
      </Center>
    </Box>
  );
};
