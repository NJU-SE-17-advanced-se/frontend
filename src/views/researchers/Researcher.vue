<template>
  <div class="wrapper">
    <el-header>
      <el-button type="primary" style="float: left" @click="$router.go(-1)">
        <i class="el-icon-back" /> 返回
      </el-button>
      <h1 style="text-align: center">{{ pageTitle }}</h1>
    </el-header>
    <el-main>
      <el-tabs v-model="activeTabName">
        <el-tab-pane label="学者详情" name="detail" lazy>
          <el-card class="result-card" v-loading="isLoading">
            <template #header>
              <h2>{{ researcherInfo.name }}</h2>
            </template>
            <p><strong>OASIS-impact:</strong> {{ researcherImpact }}</p>
            <!--全部机构-->
            <p><strong>Affiliations:</strong></p>
            <ul
              v-for="(affiliation, i) of researcherInfo.affiliation"
              :key="'a' + i"
            >
              <li>{{ affiliation }}</li>
            </ul>
            <!--代表作-->
            <p><strong>5 Selected Papers:</strong></p>
            <ul v-for="(paper, i) of researcherInfo.papers" :key="'p' + i">
              <li>{{ paper }}</li>
            </ul>
            <p><strong>Domains:</strong></p>
            <ul v-for="(domain, i) of researcherInfo.domains" :key="'d' + i">
              <li>{{ domain }}</li>
            </ul>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="历史论文" name="papers" lazy>
          <researcher-papers :id="researcherInfo.id" />
        </el-tab-pane>
        <el-tab-pane label="历史机构" name="affiliations" lazy>
          <researcher-affiliations :id="researcherInfo.id" />
        </el-tab-pane>
        <el-tab-pane label="历史领域" name="domains" lazy>
          <researcher-domains :id="researcherInfo.id" />
        </el-tab-pane>
        <el-tab-pane label="领域预测" name="prediction" lazy>
          <researcher-domains-prediction :id="researcherInfo.id" />
        </el-tab-pane>
        <el-tab-pane label="合作关系" name="partnership" lazy>
          <researcher-partnership :id="researcherInfo.id" />
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Card, Header, Main, TabPane, Tabs } from "element-ui";
import { Researcher } from "@/interfaces/researchers";

export default Vue.extend({
  name: "Researcher",
  props: {
    id: String
  },
  components: {
    [Card.name]: Card,
    [Header.name]: Header,
    [Main.name]: Main,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    ResearcherAffiliations: () =>
      import("@/components/ResearcherAffiliations.vue"),
    ResearcherDomains: () => import("@/components/ResearcherDomains.vue"),
    ResearcherDomainsPrediction: () =>
      import("@/components/ResearcherDomainsPrediction.vue"),
    ResearcherPapers: () => import("@/components/ResearcherPapers.vue"),
    ResearcherPartnership: () =>
      import("@/components/ResearcherPartnership.vue")
  },
  data() {
    return {
      activeTabName: "detail",
      isLoading: false,
      researcherInfo: {
        id: "",
        name: "",
        affiliation: [],
        papers: [],
        domains: []
      } as Researcher,
      researcherImpact: "分析中..."
    };
  },
  computed: {
    pageTitle(): string {
      switch (this.activeTabName) {
        case "detail":
          return "学者详情";
        case "papers":
          return "历史论文";
        case "affiliations":
          return "历史机构";
        case "domains":
          return "历史领域";
        case "prediction":
          return "领域预测";
        case "partnership":
          return "合作关系";
        default:
          return "未知";
      }
    }
  },
  mounted() {
    this.isLoading = true;
    setTimeout(() => {
      this.researcherInfo = {
        id: "37085876994",
        name: "Jun Sun",
        affiliation: ["2909598c2cfa81a4d1e2416e7e98b7e6"],
        papers: ["7582759"],
        domains: [
          "92850b78bdc20bc1df259e9c026d1744",
          "b86df49f1c63e593d88122ef3ae50238",
          "c05fefb8e23f737b175a03597a551518",
          "dac6fd9db22d265637cc780dde4ac6ba"
        ]
      };
      this.isLoading = false;
    }, 500);
    setTimeout(() => {
      this.researcherImpact = (9.89).toString();
    }, 500);
  }
});
</script>

<style scoped lang="less">
.wrapper {
  min-height: 60vh;

  .result-card {
    min-height: 60vh;
    margin-bottom: 20px;

    .result-button {
      float: right;
      margin-bottom: 20px;
    }
  }
}
</style>
