import React, { useRef } from "react";
import { TABLE_HEADER_LIST } from "../../constants";
import { IUserItem } from "../../api/types";
import Image from "../Image";
import useInterSectionObserver from "../../hooks/useIntersectionObserver";

const TableView = ({
  items = [],
  fetchMore,
}: {
  items: IUserItem[];
  fetchMore: () => void;
}) => {
  const ref = useRef(null);
  const {} = useInterSectionObserver(ref, fetchMore);
  return (
    <table className="table-auto p-0 bg-slate-100 shadow-lg shadow-slate-200 border-current">
      <thead className="w-full">
        <tr className="flex justify-between border-b-4 border-solid border-slate-500 border-t-0 border-l-0 border-r-0">
          {TABLE_HEADER_LIST.map((item, ind) => (
            <th key={ind} className="p-4 w-64 text-left	">
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="flex flex-col">
        {items?.map((item, i) => (
          <tr
            ref={items.length === i + 1 ? ref : null}
            key={item.id}
            className="flex justify-between items-center"
          >
            <td className="p-4 w-64 text-left	">
              <Image src={item.avatar_url} alt="git-user-avatar" />
            </td>
            <td className="p-4 w-64 text-left	">{item.id}</td>
            <td className="p-4 w-64 text-left	">{item.login}</td>
            <td className="p-4 w-64 text-left	">{item.score}</td>
            <td className="p-4 w-64 text-left	">
              <a
                href={item.html_url}
                target="_blank"
                className="p-2 text-md text-slate-500 border-none bg-transparent font-bold	cursor-pointer	"
              >
                View
              </a>
            </td>
          </tr>
        ))}
      </tbody>
      {/* </thead> */}
    </table>
  );
};

export default TableView;
