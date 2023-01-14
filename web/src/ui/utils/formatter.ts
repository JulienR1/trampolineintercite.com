export const formatPhone = (phone: string, joinCharacter: string) =>
  [phone.slice(0, 3), phone.slice(3, 6), phone.slice(6)].join(joinCharacter);
