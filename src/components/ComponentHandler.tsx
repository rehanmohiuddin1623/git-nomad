import React from "react";
import { IUserItem } from "../api/types";

const ComponentHandler = ({
  children,
  response: { items = [], loading = false, error = null },
}: {
  children: JSX.Element;
  response: {
    items: IUserItem[];
    loading: boolean;
    error: string | null;
  };
}): JSX.Element => {
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!loading && error) {
    return <div>{error}</div>;
  }
  if (!loading && !error && !items.length) {
    return <div>No Results</div>;
  }
  return children;
};

export default ComponentHandler;
