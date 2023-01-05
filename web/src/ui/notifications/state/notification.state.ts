import type { NotificationProps } from "@mantine/core";

export type INotification = {
  id: number;
  mounted: boolean;
  duration: number;
  props: NotificationProps;
  timeout: NodeJS.Timeout | null;
};

export type NotificationState = {
  notifications: INotification[];
};

export const initialState: NotificationState = { notifications: [] };
