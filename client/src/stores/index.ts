import { defineStore } from "pinia";
import type { Repo } from "@/interfaces/repo";
import type { Actions } from "@/interfaces/actions";

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
    },
  actions: <Actions>{
    switchMode() {
      this.mode = this.mode == "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", this.mode);
    },
    authenticate(token) {
      this.token = token;
      localStorage.setItem("token", this.token);
    },
    async getRepos(page) {
      const response = await fetch(
        `https://api.github.com/user/repos?type=owner&per_page=${this.perPage}&page=${page}`,
        {
          method: "get",
          headers: { Authorization: `Bearer ${this.token}` },
        }
      );
      if (response.status == 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("");
        this.token = "";
        return {};
      }
      const data = await response.json();
      this.repos = [...this.repos, ...data];
      return {
        hasNext: /rel="next"/.test(response.headers.get("link") ?? false),
        data,
      };
    },
    async getCommits(branch, page, repo) {
      const response = await fetch(
        `https://api.github.com/repos/${this.user.login}/${repo}/commits?repo=${branch}&per_page=${this.perPage}&page=${page}`,
        {
          method: "get",
          headers: { Authorization: `Bearer ${this.token}` },
        }
      );
      if (response.status == 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("");
        this.token = "";
        return {};
      }
      return {
        hasNext: /rel="next"/.test(response.headers.get("link") ?? false),
        data: await response.json(),
      };
    },
    async getUser() {
      if (Object.keys(this.user).length) {
        return this.user;
      }
      const response = await fetch("https://api.github.com/user", {
        method: "get",
        headers: { Authorization: `Bearer ${this.token}` },
      });
      if (response.status == 401) {
        this.token = "";
        localStorage.removeItem("token");
        return;
      }
      this.user = await response.json();
      localStorage.setItem("user", JSON.stringify(this.user));
      return this.user;
    },
    async searchRepo(q) {
      let repos: Repo[] | [] = [];
      let total = 0;
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${q}+in:name+user:@me`,
        {
          method: "get",
          headers: { Authorization: `Bearer ${this.token}` },
        }
      );
      if (response.status == 401) {
        localStorage.removeItem("token");
        this.token = "";
        return {};
      }
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
      const response = await fetch(
        `https://api.github.com/repos/${this.user.login}/${repo}/branches`,
        {
          method: "get",
          headers: { Authorization: `Bearer ${this.token}` },
        }
      );
      if (response.status == 401) {
        localStorage.removeItem("token");
        this.token = "";
        return {};
      }
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
      const response = await fetch(
        `https://api.github.com/repos/${this.user.login}/${repo}`,
        {
          method: "get",
          headers: { Authorization: `Bearer ${this.token}` },
        }
      );
      if (response.status == 401) {
        localStorage.removeItem("token");
        this.token = "";
        return {};
      }
      const data = await response.json();
      return data;
    },
  },
});
