import React, { useEffect, useState } from "react";
import { fetchUserByName } from "../api/fetchUser";
import { IData, IFetchUserByName, IUserItem } from "../api/types";

const useData = <T, U>() => {
  const [reqParams, setReqParam] = useState<{
    page: number;
    sort?: string;
    per_page?: number | undefined;
    order?: "asc" | "desc";
    loading: boolean;
    name: string;
  }>({
    per_page: 10,
    page: 1,
    loading: false,
    name: "",
  });
  const [response, setResponse] = useState<{
    data: U | null;
    error: Error | null | unknown;
  }>({
    data: null,
    error: null,
  });
  const prevResp = response.data as any;

  const fetchHandler = async <W extends IFetchUserByName>(
    params: W,
    sort = false
  ) => {
    try {
      if (!prevResp?.items?.length) {
        setReqParam({
          ...reqParams,
          loading: true,
        });
      }
      const res = await fetchUserByName({ ...reqParams, ...params });
      const data: U & IData = await res.json();
      setReqParam((req_param) => ({
        ...req_param,
        ...params,
        loading: false,
      }));
      if (prevResp && prevResp?.items?.length && data && !sort) {
        const merged: any = [...prevResp.items, ...data.items];
        setResponse({
          ...response,
          data: {
            ...data,
            items: [...merged],
          },
        });
      } else {
        setResponse({ ...response, data: { ...data } });
      }
    } catch (e: unknown) {
      let message = "Something Went Wrong !!";
      if ((e as Error)?.message) {
        message = (e as Error)?.message;
      }
      setResponse({ ...response, error: message });
      setReqParam({ ...reqParams, loading: false });
    }
  };

  return {
    reqParams,
    response,
    fetchUsers: fetchHandler,
  } as const;
};

export default useData;
