import {
  Anchor,
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
import { Routes } from "@trampo/routes";
import { validateForm } from "@trampo/ui/utils/form-validation";
import { AuthCredentials } from "common";
import { FormEvent, useCallback, useReducer, useRef } from "react";
import { useAuth } from "../../auth";
import {
  LoginState,
  onBeginSubmit,
  onCompleteSubmit,
  onValidate,
  reducer,
} from "./state";

const initialState: LoginState = {
  errors: undefined,
  isDirty: false,
  isLoading: false,
  hasFailedConnection: false,
};

export const Login = () => {
  const { login } = useAuth();
  const formRef = useRef<HTMLFormElement>(null);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { errors, isDirty, isLoading, hasFailedConnection } = state;

  const handleChange = useCallback(() => {
    const validation = validateForm(AuthCredentials, formRef.current);
    dispatch(onValidate(validation));
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const validation = validateForm(AuthCredentials, formRef.current);
      dispatch(onBeginSubmit(validation));

      if (validation.success) {
        const success = await login(
          validation.data.email,
          validation.data.password,
        );
        dispatch(onCompleteSubmit(success));
      }
    },
    [login],
  );

  return (
    <Box style={{ backgroundColor: "rgba(0,0,0,0.03)" }}>
      <Center style={{ height: "100vh" }}>
        <Card shadow="md" style={{ width: "350px" }}>
          <form ref={formRef} onChange={handleChange} onSubmit={handleSubmit}>
            <Title size={"h3"}>Se connecter</Title>

            <TextInput
              label="Adresse courriel"
              placeholder="nom@domaine.com"
              name="email"
              error={isDirty && errors?.email?._errors}
            />
            <PasswordInput
              label="Mot de passe"
              name="password"
              error={isDirty && errors?.password?._errors}
            />

            <Space h="lg" />

            <Stack spacing="xs">
              <Button
                type="submit"
                color="indigo"
                loading={isLoading}
                disabled={isDirty && errors !== undefined}>
                <Text color="white" weight="bold">
                  Connexion
                </Text>
              </Button>

              <Anchor size="xs" align="center" color="gray" href={Routes.HOME}>
                Retour au site principal
              </Anchor>
            </Stack>
          </form>

          {hasFailedConnection && (
            <>
              <Space h="xs" />
              <Text color="red" weight="bold" size="sm" align="center">
                La combinaison entrée est invalide
              </Text>
            </>
          )}
        </Card>
      </Center>
    </Box>
  );
};
