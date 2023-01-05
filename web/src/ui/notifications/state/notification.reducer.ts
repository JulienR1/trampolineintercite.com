import type { NotificationAction } from ".";
import type { NotificationState } from "./notification.state";

export function reducer(
  state: NotificationState,
  action: NotificationAction,
): NotificationState {
  switch (action.type) {
    case "APPEND":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case "MOUNT":
      return {
        ...state,
        notifications: [
          ...state.notifications.map(notification =>
            notification.id === action.payload.id
              ? {
                  ...notification,
                  mounted: true,
                  timeout: action.payload.timeout,
                }
              : notification,
          ),
        ],
      };
    case "DISMOUNT":
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, mounted: false }
            : notification,
        ),
      };
    case "REMOVE":
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload,
        ),
      };
    default:
      return state;
  }
}
