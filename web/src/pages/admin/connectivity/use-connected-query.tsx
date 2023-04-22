import { client } from "@trampo/resources/client";
import { useContext, useEffect } from "react";
import {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "react-query";
import { ConnectivityContext } from "./connectivity-context";

const idleTime =
  60 * 1000 * parseInt(import.meta.env.PUBLIC_BACKEND_IDLE_TIME_IN_MINS);

export const useConnectedQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey" | "queryFn"
  >,
): UseQueryResult<TData, TError> => {
  const { lastRequestTimeRef, setIsWaitingForServer } =
    useContext(ConnectivityContext);

  const lastRequestTime = lastRequestTimeRef.current;
  const hasGoneIdle =
    lastRequestTime === null ||
    new Date().getTime() - lastRequestTime.getTime() > idleTime;

  useEffect(() => {
    if (hasGoneIdle) {
      setIsWaitingForServer(true);
      client.ping.query().then(() => {
        lastRequestTimeRef.current = new Date();
        setIsWaitingForServer(false);
      });
    }
  }, [queryKey, queryFn, options]);

  return useQuery(queryKey, queryFn, options);
};
