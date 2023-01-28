import { formatErrors } from "@trampo/ui/utils/form-validation";
import { initialState, MessageAction, MessageState } from ".";

const isFormDirty = (state: MessageState) => {
  return Object.entries(state).some(
    ([key, value]) => value !== initialState[key as keyof MessageState],
  );
};

export function reducer(
  state: MessageState,
  action: MessageAction,
): MessageState {
  switch (action.type) {
    case "VALIDATE":
      return {
        ...state,
        errors: formatErrors(action.payload),
        isDirty: isFormDirty(state),
      };
    case "SET_MESSAGE":
      return {
        ...state,
        message: action.payload.message,
        errors: formatErrors(action.payload.validation),
        isDirty: isFormDirty(state),
      };
    case "SUBMIT":
      return {
        ...state,
        showErrors: true,
        errors: formatErrors(action.payload),
      };
    case "RESET":
      return { ...state, errors: undefined, isDirty: false, showErrors: false };
    default:
      return state;
  }
}
