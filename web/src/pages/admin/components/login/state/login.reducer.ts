import { formatErrors } from "@trampo/ui/utils/form-validation";
import type { LoginAction } from ".";
import type { LoginState } from "./login.state";

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
