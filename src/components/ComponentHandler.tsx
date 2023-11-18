import React from "react";
import { IUserItem } from "../api/types";

const ComponentHandler = ({
  children,
  response: { items = [], loading = false, error = null },
  search,
}: {
  children: JSX.Element;
  response: {
    items: IUserItem[];
    loading: boolean;
    error: string | null;
  };
  search: string;
}): JSX.Element => {
  const Container = ({ children }: { children: JSX.Element }) => (
    <div className="w-full m-4 flex flex-col h-72 text-center items-center bg-slate-300 justify-center rounded-md">
      {children}
    </div>
  );
  const renderError = (): JSX.Element => {
    return (
      <Container
        children={
          <>
            {" "}
            <h3>{error}</h3>
            <button
              onClick={() => {
                window.location.href = "/";
              }}
              className="bg-white-100 border-0 p-2 rounded-md font-sans cursor-pointer"
            >
              Try Again
            </button>
          </>
        }
      />
    );
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!loading && error) {
    return renderError();
  }
  if (!loading && !error && !items.length) {
    return search?.length > 0 ? (
      <Container
        children={
          <>
            <div>No Items for Search : {search}</div>
          </>
        }
      />
    ) : (
      <div>Search for Users</div>
    );
  }
  return children;
};

export default ComponentHandler;
