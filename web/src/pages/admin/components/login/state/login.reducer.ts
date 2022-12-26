import type { LoginAction, onValidate } from ".";
import type { LoginState } from "./login.state";

const formatErrors = (validation: ReturnType<typeof onValidate>["payload"]) => {
  return !validation.success ? validation.error.format() : undefined;
};

export function reducer(state: LoginState, action: LoginAction): LoginState {
  switch (action.type) {
    case "VALIDATION":
      return {
        ...state,
        errors: formatErrors(action.payload),
      };
    case "BEGIN_SUBMIT":
      return {
        ...state,
        isDirty: true,
        errors: formatErrors(action.payload),
        isLoading: action.payload.success,
      };
    case "COMPLETE_SUBMIT":
      return {
        ...state,
        isLoading: false,
        hasFailedConnection: !action.payload,
      };
    default:
      return state;
  }
}
