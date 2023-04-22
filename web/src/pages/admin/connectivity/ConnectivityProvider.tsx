import { Overlay, Portal } from "@mantine/core";
import { Spinner } from "@trampo/ui/spinner";
import { FC, ReactNode, useRef, useState } from "react";
import { ConnectivityContext } from "./connectivity-context";

type ConnectivityProviderProps = {
  children: ReactNode | ReactNode[];
};

export const ConnectivityProvider: FC<ConnectivityProviderProps> = ({
  children,
}) => {
  const lastRequestTimeRef = useRef<Date | null>(null);
  const [isWaitingForServer, setIsWaitingForServer] = useState(false);

  return (
    <ConnectivityContext.Provider
      value={{ lastRequestTimeRef, isWaitingForServer, setIsWaitingForServer }}>
      {isWaitingForServer && (
        <Portal>
          <Overlay fixed color="#fff" opacity={0.8} blur={0.5}>
            <Spinner message="Démarrage du serveur..." />
          </Overlay>
        </Portal>
      )}
      {children}
    </ConnectivityContext.Provider>
  );
};
