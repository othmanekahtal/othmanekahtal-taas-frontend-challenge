import type { Repo } from "./repo";
import type { User } from "./user";

export interface States {
  mode: string;
  token: string;
  user: User;
  repos: Repo[] | [];
  page: number;
  perPage: number;
}
