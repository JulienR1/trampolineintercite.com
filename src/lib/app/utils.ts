export const formatPhone = (phone: string, joinCharacter: string) =>
  [phone.slice(0, 3), phone.slice(3, 6), phone.slice(6)].join(joinCharacter);

export const getFormData = <T extends Record<string, unknown>>(
  form: HTMLFormElement,
): T => {
  const formData = {};
  new FormData(form).forEach((value, key) => (formData[key] = value));
  return formData as T;
};
