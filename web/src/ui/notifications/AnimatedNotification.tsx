import "./AnimatedNotification.scss";

import { Notification, Transition } from "@mantine/core";
import classNames from "classnames";
import type { CSSProperties, FC } from "react";
import { useRef, useState } from "react";
import type { INotification } from "./state";

type AnimatedNotificationProps = {
  duration?: number;
  notification: INotification;
  onExit: () => void;
  onExited: () => void;
};

export const AnimatedNotification: FC<AnimatedNotificationProps> = ({
  duration = 400,
  notification,
  onExit,
  onExited,
}) => {
  const notificationContainerRef = useRef<HTMLDivElement>(null);
  const [notificationHeight, setNotificationHeight] = useState(0);

  return (
    <div
      className={classNames("animatedNotification", {
        "animatedNotification--mounted": notification.mounted,
      })}
      style={{ "--height": notificationHeight + "px" } as CSSProperties}>
      <Transition
        key={notification.id}
        duration={duration}
        timingFunction="ease"
        transition="slide-left"
        mounted={notification.mounted}
        onEnter={() =>
          setNotificationHeight(
            notificationContainerRef.current?.offsetHeight ?? 0,
          )
        }
        onExited={onExited}>
        {styles => (
          <div ref={notificationContainerRef} style={styles}>
            <Notification
              {...notification.props}
              mt="md"
              onClose={onExit}
              style={{ maxWidth: "400px", ...notification.props.style }}
            />
          </div>
        )}
      </Transition>
    </div>
  );
};
