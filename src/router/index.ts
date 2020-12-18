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
    // 放在这里提高匹配优先级，避免被画像页面覆盖
    {
      path: "/papers/reviewer-recommendation",
      name: "审稿人推荐",
      component: () => import("@/views/PaperReviewerRecommendation.vue")
    },
    {
      path: "/result/:mode",
      name: "搜索结果",
      component: () => import("@/views/SearchResult.vue"),
      props: route => ({ ...route.params, ...route.query })
    },
    {
      path: "/affiliations/:id",
      name: "机构详情",
      component: () => import("@/views/Affiliation.vue"),
      props: route => ({ ...route.params })
    },
    {
      path: "/domains/:id",
      name: "领域详情",
      component: () => import("@/views/Domain.vue"),
      props: route => ({ ...route.params })
    },
    {
      path: "/papers/:id",
      name: "论文详情",
      component: () => import("@/views/Paper.vue"),
      props: route => ({ ...route.params })
    },
    {
      path: "/publications/:id",
      name: "出版物详情",
      component: () => import("@/views/Publication.vue"),
      props: route => ({ ...route.params })
    },
    {
      path: "/researchers/:id",
      name: "学者详情",
      component: () => import("@/views/Researcher.vue"),
      props: route => ({ ...route.params })
    },
    {
      path: "*",
      component: () => import("@/views/404.vue")
    }
  ]
});

export default router;
