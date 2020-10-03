import { RouteConfig } from "vue-router";

const researcherRoutes: RouteConfig[] = [
  {
    path: "/researcher/search",
    component: () => import("@/views/researcher/Search.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/researcher/profile/:id",
    component: () => import("@/views/researcher/Profile.vue"),
    name: "学者画像",
    props: true,
    meta: {
      icon: "el-icon-picture"
    }
  },
  {
    path: "/researcher/relation/:id",
    component: () => import("@/views/researcher/Relation.vue"),
    name: "学术关系",
    props: true,
    meta: {
      icon: "el-icon-share"
    }
  }
];

export default researcherRoutes;
