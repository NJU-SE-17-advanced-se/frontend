<template>
  <el-menu :default-active="computedDefaultActive" router>
    <!--学者-->
    <el-submenu index="/researcher">
      <template #title>
        <i class="el-icon-user"></i>
        <span>学者</span>
      </template>
      <template v-for="(item, i) of researcherNavItems">
        <el-menu-item
          v-if="!item.meta.hidden"
          :index="item.path"
          :key="'nav' + i"
        >
          <i :class="item.meta.icon"></i>
          <template #title>
            <span>{{ item.name }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-submenu>
    <!--论文-->
    <!--    <el-submenu index="1">-->
    <!--      <template #title>-->
    <!--        <i class="el-icon-document-copy"></i>-->
    <!--        <span>论文</span>-->
    <!--      </template>-->
    <!--      <el-menu-item index="1">-->
    <!--        <i class="el-icon-s-data"></i>-->
    <!--        <span slot="title">论文画像</span>-->
    <!--      </el-menu-item>-->
    <!--      <el-menu-item index="2">-->
    <!--        <i class="el-icon-s-opportunity"></i>-->
    <!--        <span slot="title">审稿人推荐</span>-->
    <!--      </el-menu-item>-->
    <!--    </el-submenu>-->
  </el-menu>
</template>

<script lang="ts">
import Vue from "vue";
import { Menu, MenuItem, MenuItemGroup, Submenu } from "element-ui";
import researcherRoutes from "@/router/researcher";

export default Vue.extend({
  name: "NavBar",
  components: {
    [Menu.name]: Menu,
    [MenuItem.name]: MenuItem,
    [MenuItemGroup.name]: MenuItemGroup,
    [Submenu.name]: Submenu
  },
  data() {
    return {
      researcherNavItems: researcherRoutes
    };
  },
  computed: {
    computedDefaultActive() {
      return this.$route.path;
    }
  }
});
</script>
