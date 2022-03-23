import type { Repo } from "./repo";
import type { User } from "./user";

export interface Actions {
  switchMode: void;
  authenticate(token: string): void;
  getRepos(page: number): Promise<{ hasNext?: boolean; data?: Repo[] | [] }>;
  getUser: Promise<User | undefined>;
  searchRepo(q: string): Promise<{ repos: Repo[]; total: number } | {}>;
  getBranches(repo: string): Promise<{ [x: string]: dynamic }>;
}
