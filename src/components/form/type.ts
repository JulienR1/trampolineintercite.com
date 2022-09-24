export type IFormContext = {
  onChange: () => void;
  getErrors: (label: string) => string[];
  subscribeToSubmit: (calback: () => void) => () => void;
};
