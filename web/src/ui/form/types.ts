export type FormRef = {
  reset: () => void;
  isDirty: () => boolean;
};

export type FormProps<T> = {
  onSubmit: (data: T) => void;
  onReset: () => void;
};

export type InnerFormProps<T> = FormProps<T> & { onBeginReset: () => void };
