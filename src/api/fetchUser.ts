import { SetStateAction } from "react";
import { API_ENPOINT } from "../constants";
import { IData, IFetchUserByName } from "./types";

export const fetchUserByName = ({
  name,
  ...restPayload
}: IFetchUserByName & { loading: boolean }) => {
  const searchQuery = Object.entries({ q: name, ...restPayload })
    .map((e) => e.join("="))
    .join("&");

  return fetch(`${API_ENPOINT}/search/users?${searchQuery}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
    },
  });
};