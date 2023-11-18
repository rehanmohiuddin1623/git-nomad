import React from "react";
import { TABLE_SORT_OPTIONS } from "../constants";
import { IsortOption } from "../api/types";

const Search = ({
  onTextInput,
  handleFilter,
  sort,
  searchVal,
}: {
  onTextInput: (val: string) => void;
  handleFilter: (val: IsortOption) => void;
  sort?: IsortOption;
  searchVal: string;
}) => {
  const debounce = (cb: (val: string) => void, timeout: number) => {
    let timer: NodeJS.Timeout | null = null;
    return (val: string) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        cb(val);
      }, timeout);
    };
  };

  const handleOnChange = debounce(onTextInput, 300);
  return (
    <div className="flex  justify-between pl-4 pr-4">
      <input
        className="p-4 m-4 mt-0 border-2 border-solid border-slate-500  focus:outline-none focus:border-indigo-500 w-72 "
        placeholder="Search Name Eg : John Doe"
        onChange={(e) => handleOnChange(e.target.value)}
        id="search-user-name"
      />
      {searchVal.length && (
        <select
          onChange={(e) => handleFilter(e.target.value as IsortOption)}
          className="font-sans bg-slate-100 w-32 h-8 text-slate-500 rounded-sm p-1 shadow-lg shadow-gray-200 border-none "
        >
          {!sort && <option value={""}>Select Sort</option>}{" "}
          {TABLE_SORT_OPTIONS.map((val) => (
            <option value={val} className="p-1 border-none">
              {val}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Search;
