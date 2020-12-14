import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "首页",
      component: () => import("@/views/Search.vue")
    },
    {
      path: "/result/:mode",
      name: "搜索结果",
      component: () => import("@/views/SearchResult.vue"),
      props: route => ({ ...route.params, ...route.query })
    },
    {
      path: "/papers/reviewer-recommendation",
      name: "审稿人推荐",
      component: () => import("@/views/papers/ReviewerRecommendation.vue")
    },
    {
      path: "*",
      component: () => import("@/views/404.vue")
    }
  ]
});

export default router;
