import React, { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import "./styles.css";
import useData from "./hooks/useData";
import TableView from "./components/TableView";
import { IData } from "./api/types";
import Search from "./components/Search";
import ComponentHandler from "./components/ComponentHandler";
import mixpanel from "mixpanel-browser";
import useInterSectionObserver from "./hooks/useIntersectionObserver";

function App() {
  const { reqParams, response, fetchUsers } = useData<null, IData>();
  const [search, setSearch] = useState("");
  // const {} = useInterSectionObserver(ref);
  const [page, setPage] = useState(2);
  useEffect(() => {
    mixpanel.track("Home Page Loaded");
  }, []);
  return (
    <div className="flex-col root-app-body">
      <Header />
      <Search
        searchVal={reqParams.name}
        onTextInput={(val) => {
          setSearch(val);
          if (val?.length) {
            fetchUsers({
              name: val,
              page: 1,
            });
            mixpanel.track("Search Action", {
              searchQuery: val,
            });
          }
        }}
        handleFilter={(val) => {
          fetchUsers(
            {
              name: reqParams.name,
              sort: val?.length ? val : null,
            },
            true
          );
          mixpanel.track("Filter Applied", {
            filter: val,
          });
        }}
      />
      <div className="flex flex-col items-center justify-center">
        <ComponentHandler
          response={{
            items: response.data?.items ?? [],
            loading: reqParams.loading,
            error: response.error as string | null,
          }}
          search={search}
        >
          <>
            <TableView
              items={response.data?.items ?? []}
              fetchMore={() => {
                fetchUsers({
                  name: search,
                  page: reqParams.page + 1,
                });
                mixpanel.track("Pagination Table", {
                  page_no: reqParams.page,
                  name: search,
                });
              }}
            />
          </>
        </ComponentHandler>

        {/* <div style={{ height: 28, width: 28 }} ref={ref}></div> */}
      </div>
    </div>
  );
}

export default App;
