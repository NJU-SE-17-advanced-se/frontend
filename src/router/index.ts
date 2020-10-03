import Vue from "vue";
import VueRouter from "vue-router";
import researcherRoutes from "@/router/researcher";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    // 首页
    {
      path: "/",
      name: "首页",
      component: () => import("@/views/Index.vue")
    },
    // 学者
    {
      path: "/researcher",
      name: "学者",
      component: () => import("@/views/Researcher.vue"),
      children: researcherRoutes
    }
    // 论文
  ]
});

export default router;
