import { defineStore } from "pinia";
import type { Repo } from "@/interfaces/repo";
import type { Actions } from "@/interfaces/actions";

import type { User } from "@/interfaces/user";
export const useStore = defineStore("main", {
  state: () =>
    <States>{
      token: localStorage.getItem("token") ?? "",
      user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : {},
    },
  actions: <Actions>{
    authenticate(token) {
      this.token = token;
      localStorage.setItem("token", this.token);
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
  },
});
