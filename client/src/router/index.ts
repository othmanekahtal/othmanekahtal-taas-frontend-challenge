import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import { useStore } from "@/stores/index";
import nProgress from "nprogress";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      alias: "/login",
      name: "Login",
      component: LoginView,
    },

    {
      path: "/auth/github",
      name: "Auth",
      component: () =>
        import(
          /* webpackChunkName: "auth-github-view" */ "@/views/AuthGithub.vue"
        ),
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () =>
        import(
          /* webpackChunkName: "Repos-view" */ "@/views/DashboardView.vue"
        ),
    },

    {
      path: "/:catchAll(.*)",
      name: "Error404",
      component: () =>
        import(/* webpackChunkName: "error-404-view" */ "@/views/Error404.vue"),
    },
  ],
});
router.beforeEach(() => {
  nProgress.start();
});
router.afterEach(() => {
  nProgress.done();
});
export default router;
