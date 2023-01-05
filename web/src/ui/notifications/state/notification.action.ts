import type { Action } from "@trampo/resources/action";
import type { INotification } from "./notification.state";

export const appendNotification = (
  notification: INotification,
): Action<"APPEND", INotification> => ({
  type: "APPEND",
  payload: notification,
});

export const mountNotification = (
  id: number,
  timeout: NodeJS.Timeout,
): Action<"MOUNT", { id: number; timeout: NodeJS.Timeout }> => ({
  type: "MOUNT",
  payload: { id, timeout },
});

export const dismountNotification = (
  id: number,
): Action<"DISMOUNT", number> => ({
  type: "DISMOUNT",
  payload: id,
});

export const removeNotification = (id: number): Action<"REMOVE", number> => ({
  type: "REMOVE",
  payload: id,
});
