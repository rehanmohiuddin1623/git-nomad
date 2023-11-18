import React, { useEffect } from "react";
import Header from "./components/Header";
import "./styles.css";
import useData from "./hooks/useData";
import TableView from "./components/TableView";
import { IData } from "./api/types";
import Search from "./components/Search";
import ComponentHandler from "./components/ComponentHandler";
import mixpanel from "mixpanel-browser";

function App() {
  const { requestState, responseState, fetchUsers } = useData<null, IData>();
  console.log("Users", process.env.REACT_APP_GITHUB_ENDPOINT);
  useEffect(() => {
    mixpanel.track("Home Page Loaded");
  }, []);
  return (
    <div className="flex-col root-app-body">
      <Header />
      <Search
        onTextInput={(val) => {
          fetchUsers({
            name: val,
          });
          mixpanel.track("Search Action", {
            searchQuery: val,
          });
        }}
      />
      <div className="flex justify-center">
        <ComponentHandler
          response={{
            items: responseState.data?.items ?? [],
            loading: requestState.loading,
            error: responseState.error as string | null,
          }}
        >
          <TableView items={responseState.data?.items ?? []} />
        </ComponentHandler>
      </div>
    </div>
  );
}

export default App;
