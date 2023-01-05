import { NotificationProps, Portal } from "@mantine/core";
import type { CSSProperties, FC, ReactNode } from "react";
import { useEffect, useReducer } from "react";
import { AnimatedNotification } from "./AnimatedNotification";
import {
  NotificationContext,
  NotificationOptions,
} from "./notification-context";
import {
  appendNotification,
  dismountNotification,
  initialState,
  INotification,
  mountNotification,
  reducer,
  removeNotification,
} from "./state";

type NotificationProviderProps = {
  children: ReactNode;
};

let notificationId = 0;

export const NotificationProvider: FC<NotificationProviderProps> = ({
  children,
}) => {
  const [{ notifications }, dispatch] = useReducer(reducer, initialState);

  const addNotification = (
    title: string,
    message: string,
    options?: NotificationOptions,
  ) => {
    const sendNotification = (props?: NotificationProps) => {
      const id = notificationId++;
      const notification: INotification = {
        id,
        timeout: null,
        mounted: false,
        duration: options?.duration ?? 5000,
        props: { ...props, title, children: message },
      };

      dispatch(appendNotification(notification));
    };

    return {
      info: () => sendNotification({ color: "indigo" }),
      success: () => sendNotification({ color: "green" }),
      warning: () => sendNotification({ color: "yellow" }),
      error: () => sendNotification({ color: "red" }),
    };
  };

  useEffect(() => {
    for (const notification of notifications) {
      if (!notification.mounted) {
        if (!notification.timeout) {
          const timeout = setTimeout(
            () => dispatch(dismountNotification(notification.id)),
            notification.duration,
          );
          dispatch(mountNotification(notification.id, timeout));
        } else {
          clearTimeout(notification.timeout);
        }
      }
    }
  }, [notifications]);

  useEffect(() => {
    return () => {
      for (const notification of notifications) {
        if (notification.timeout) {
          clearTimeout(notification.timeout);
        }
      }
    };
  }, []);

  const containerStyles: CSSProperties = {
    position: "absolute",
    top: "24px",
    right: "24px",
    zIndex: 300,
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      {notifications.length > 0 && (
        <Portal>
          <div style={containerStyles}>
            {notifications.map(notification => (
              <AnimatedNotification
                key={notification.id}
                notification={notification}
                onExit={() => dispatch(dismountNotification(notification.id))}
                onExited={() => dispatch(removeNotification(notification.id))}
              />
            ))}
          </div>
        </Portal>
      )}
    </NotificationContext.Provider>
  );
};
