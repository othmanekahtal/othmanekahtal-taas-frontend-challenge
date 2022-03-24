import { defineStore } from "pinia";
import type { Repo } from "@/interfaces/repo";
import type { Actions } from "@/interfaces/actions";
import { Api } from "@/services/api";
import { useRouter } from "vue-router";

export const useStore = defineStore("main", {
  state: () =>
    <States>{
      mode: localStorage.getItem("theme") ?? "light",
      token: localStorage.getItem("token") ?? "",
      repos: [],
      user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : {},
      perPage: 5,
      api: new Api({
        url: "https://api.github.com",
        token: localStorage.getItem("token") ?? "",
      }),
      router: useRouter(),
    },
  actions: <Actions>{
    switchMode() {
      this.mode = this.mode == "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", this.mode);
    },
    clearCredentials(status) {
      if (status == 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.token = this.user = "";
        this.router.push({ name: "Login" });
      }
    },
    authenticate(token) {
      this.token = token;
      this.api.token = this.token;
      localStorage.setItem("token", this.token);
    },
    async getRepos(page) {
      const response = await this.api.getRepos({ page, perPage: this.perPage });
      console.log(this);
      this.clearCredentials(response.status);
      const data = await response.json();
      this.repos = [...this.repos, ...data];
      return {
        hasNext: /rel="next"/.test(response.headers.get("link") ?? false),
        data,
      };
    },
    async getCommits(branch, page, repo) {
      const response = await this.api.getCommits({
        branch,
        page,
        perPage: this.perPage,
        repo,
        userID: this.user.login,
      });
      this.clearCredentials(response.status);
      return {
        hasNext: /rel="next"/.test(response.headers.get("link") ?? false),
        data: await response.json(),
      };
    },
    async getUser() {
      if (Object.keys(this.user).length) {
        return this.user;
      }
      const response = await this.api.getUser();
      this.clearCredentials(response.status);
      this.user = await response.json();
      localStorage.setItem("user", JSON.stringify(this.user));
      return this.user;
    },
    async searchRepo(q) {
      let repos: Repo[] | [] = [];
      let total = 0;
      const response = await this.api.searchRepo(q);
      this.clearCredentials(response.status);
      const data = await response.json();
      repos = data["items"];
      total = data["total_count"];
      // }
      return {
        repos,
        total: total,
      };
    },
    async getBranches(repo) {
      const response = await this.api.getBranches({
        repo,
        userID: this.user.login,
      });
      this.clearCredentials(response.status);
      const data = await response.json();
      return data;
    },
    async getRepo(repo) {
      if (this.repos.length) {
        const repoFiltered = this.repos.filter(
          (element) => element["name"] == repo
        )[0];
        if (repoFiltered) return repoFiltered;
      }
      const response = await this.api.getRepo({
        repo,
        userID: this.user.login,
      });
      this.clearCredentials(response.status);
      const data = await response.json();
      return data;
    },
  },
});
