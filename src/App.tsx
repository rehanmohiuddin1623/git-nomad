import React, { useEffect, useRef, useState } from "react";
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
  const [search, setSearch] = useState("");
  useEffect(() => {
    mixpanel.track("Home Page Loaded");
  }, []);
  return (
    <div className="flex-col root-app-body">
      <Header />
      <Search
        onTextInput={(val) => {
          setSearch(val);
          if (val?.length) {
            fetchUsers({
              name: val,
            });
            mixpanel.track("Search Action", {
              searchQuery: val,
            });
          }
        }}
      />
      <div className="flex justify-center">
        <ComponentHandler
          response={{
            items: responseState.data?.items ?? [],
            loading: requestState.loading,
            error: responseState.error as string | null,
          }}
          search={search}
        >
          <>
            <TableView items={responseState.data?.items ?? []} />
          </>
        </ComponentHandler>
      </div>
    </div>
  );
}

export default App;
