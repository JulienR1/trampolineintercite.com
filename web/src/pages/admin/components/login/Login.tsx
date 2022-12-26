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
import { FormEvent, useCallback, useReducer, useRef } from "react";
import { useAuth } from "../../auth";
import { validateForm } from "./service";
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
    const validation = validateForm(formRef);
    dispatch(onValidate(validation));
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const validation = validateForm(formRef);
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

            <Stack>
              <Button
                type="submit"
                color="indigo"
                loading={isLoading}
                disabled={isDirty && errors !== undefined}>
                <Text color="white" weight="bold">
                  Connexion
                </Text>
              </Button>
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
