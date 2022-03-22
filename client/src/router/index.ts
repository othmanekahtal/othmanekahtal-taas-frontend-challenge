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
      beforeEnter(_, __, next) {
        const { token } = useStore();
        token ? next({ name: "Dashboard" }) : next();
      },
    },

    {
      path: "/auth/github",
      name: "Auth",
      component: () =>
        import(
          /* webpackChunkName: "auth-github-view" */ "@/views/AuthGithub.vue"
        ),
      beforeEnter(_, __, next) {
        const { token } = useStore();
        token ? next({ name: "Dashboard" }) : next();
      },
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () =>
        import(
          /* webpackChunkName: "Repos-view" */ "@/views/DashboardView.vue"
        ),
      beforeEnter(_, __, next) {
        const { token } = useStore();
        token ? next() : next({ name: "Login" });
      },
    },

    {
      path: "/:catchAll(.*)",
      name: "Error404",
      component: () =>
        import(/* webpackChunkName: "error-404-view" */ "@/views/Error404.vue"),
    },
    // {
    //   path: "/network-error",
    //   name: "NetworkError",
    //   component: () =>
    //     import(
    //       /* webpackChunkName: "error-404-view" */ "@/views/NetworkError.vue"
    //     ),
    // },
  ],
});
router.beforeEach(() => {
  nProgress.start();
});
router.afterEach(() => {
  nProgress.done();
});
export default router;
