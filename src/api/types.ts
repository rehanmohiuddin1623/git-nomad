export type IsortOption =
  | "followers"
  | "repositories"
  | "joined"
  | undefined
  | null;
export interface IFetchUserByName {
  name: string;
  sort?: IsortOption;
  order?: "asc" | "desc" | undefined;
  per_page?: number | undefined;
  page?: number | undefined;
}

export interface IUserItem {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  score: number;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}

export interface IData {
  incomplete_results: boolean;
  items: IUserItem[];
  total_count: number;
}

export interface IReqParams {
  page: number;
  sort?: string;
  per_page?: number | undefined;
  order?: "asc" | "desc";
  loading: boolean;
  name: string;
}
