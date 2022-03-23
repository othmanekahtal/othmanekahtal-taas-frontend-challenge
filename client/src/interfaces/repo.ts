export interface Repo {
  name: string;
  default_branch: string;
  description: string;
  [x: string]: dynamic;
}
