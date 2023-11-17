import React, { useEffect, useState } from "react";
import { fetchUserByName } from "../api/fetchUser";
import { IFetchUserByName } from "../api/types";

const useData = <T, U>() => {
  const [reqParams, setReqParam] = useState<{
    page: number;
    sort?: string;
    per_page?: number | undefined;
    order?: "asc" | "desc";
    loading: boolean;
  }>({
    per_page: 10,
    page: 1,
    loading: false,
  });
  const [response, setResponse] = useState<{
    data: U | null;
    error: Error | null | unknown;
  }>({
    data: null,
    error: null,
  });

  const fetchHandler = async <W extends IFetchUserByName>(params: W) => {
    let resp: {
      data: U | null;
      loading: boolean;
      error: Error | null | unknown;
    } = {
      data: null,
      loading: false,
      error: null,
    };
    setReqParam({
      ...reqParams,
      loading: true,
    });
    try {
      const res = await fetchUserByName({ ...reqParams, ...params });
      const data = await res.json();
      resp.data = data;
    } catch (e: unknown) {
      let message = "Something Went Wrong !!";
      if ((e as Error)?.message) {
        message = (e as Error)?.message;
      }
      resp.error = message;
    } finally {
      setResponse({ ...resp });
      setReqParam({ ...reqParams, ...params, loading: false });
    }
  };

  return {
    requestState: reqParams,
    responseState: response,
    fetchUsers: fetchHandler,
  } as const;
};

export default useData;
