<template>
  <div class="wrapper">
    <el-header>
      <el-button type="primary" style="float: left" @click="$router.go(-1)">
        <i class="el-icon-back" /> 返回
      </el-button>
      <h1 style="text-align: center">{{ tabTitle }}</h1>
    </el-header>
    <el-main>
      <el-tabs v-model="activeTabName">
        <el-tab-pane label="推荐审稿人" name="recommend" lazy>
          <reviewers-recommended />
        </el-tab-pane>
        <el-tab-pane label="不推荐审稿人" name="not-recommend" lazy>
          <reviewers-not-recommended />
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Header, Main, TabPane, Tabs } from "element-ui";

export default Vue.extend({
  name: "ReviewerRecommendation",
  components: {
    [Header.name]: Header,
    [Main.name]: Main,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    ReviewersRecommended: () =>
      import("@/components/reviewer-recommendation/ReviewersRecommended.vue"),
    ReviewersNotRecommended: () =>
      import("@/components/reviewer-recommendation/ReviewersNotRecommend.vue")
  },
  data() {
    return {
      activeTabName: "recommend"
    };
  },
  computed: {
    tabTitle(): string {
      return this.activeTabName === "recommend" ? "推荐审稿人" : "不推荐审稿人";
    }
  }
});
</script>
