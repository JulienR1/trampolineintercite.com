import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  createContext,
} from "react";

type IConnectivityContext = {
  lastRequestTimeRef: MutableRefObject<Date | null>;
  isWaitingForServer: boolean;
  setIsWaitingForServer: Dispatch<SetStateAction<boolean>>;
};

export const ConnectivityContext = createContext<IConnectivityContext>(
  {} as IConnectivityContext,
);
