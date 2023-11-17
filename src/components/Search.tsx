import React from "react";

const Search = ({ onTextInput }: { onTextInput: (val: string) => void }) => {
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
    <div className="flex flex-col">
      <input
        className="p-4 m-4 mt-0 border-2 border-solid border-slate-500  focus:outline-none focus:border-indigo-500 "
        placeholder="Search Name Eg : John Doe"
        onChange={(e) => handleOnChange(e.target.value)}
        id="search-user-name"
      />
    </div>
  );
};

export default Search;
