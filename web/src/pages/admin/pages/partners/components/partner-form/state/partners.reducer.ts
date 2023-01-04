import { formatErrors } from "@trampo/ui/utils/form-validation";
import type { PartnerAction } from ".";
import { initialState, PartnersState } from "./partners.state";

const isFormDirty = (state: PartnersState) => {
  return Object.entries(state).some(
    ([key, value]) => value !== initialState[key as keyof PartnersState],
  );
};

export function reducer(
  state: PartnersState,
  action: PartnerAction,
): PartnersState {
  switch (action.type) {
    case "VALIDATE":
      return {
        ...state,
        errors: formatErrors(action.payload),
        isDirty: isFormDirty(state),
      };
    case "SET_LOGO":
      return {
        ...state,
        isDirty: isFormDirty(state),
        logo: action.payload.logo,
        errors: formatErrors(action.payload.validation),
      };
    case "BEGIN_SUBMIT":
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
