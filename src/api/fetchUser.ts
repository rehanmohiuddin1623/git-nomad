import { API_ENPOINT } from "../constants";
import { IFetchUserByName } from "./types";

export const fetchUserByName = ({ name, ...restPayload }: IFetchUserByName) => {
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
