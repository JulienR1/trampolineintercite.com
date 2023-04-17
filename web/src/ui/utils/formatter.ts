export const formatPhone = (phone: string, joinCharacter: string) =>
  [phone.slice(0, 3), phone.slice(3, 6), phone.slice(6)].join(joinCharacter);

export const formatDate = (date: Date): string => {
  if (date.getHours() === 0 && date.getMinutes() === 0) {
    return new Intl.DateTimeFormat("fr-CA", { dateStyle: "full" }).format(date);
  }

  const formattedDate = new Intl.DateTimeFormat("fr-CA", {
    hour12: false,
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
  return formattedDate.replace(" h ", "h");
};
