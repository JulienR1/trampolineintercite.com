import { createContext, useContext } from "react";

export type NotificationOptions = { duration?: number };

type INotificationContext = {
  addNotification: (
    title: string,
    message: string,
    options?: NotificationOptions,
  ) => {
    info: () => void;
    success: () => void;
    warning: () => void;
    error: () => void;
  };
};

export const NotificationContext = createContext<INotificationContext>(
  {} as INotificationContext,
);

export const useNotifications = () => useContext(NotificationContext);
