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
            <p>
              <strong>Affiliations:</strong>
              <span v-if="researcherInfo.affiliation.length === 0">
                暂无数据
              </span>
            </p>
            <ul>
              <li
                v-for="(affiliation, i) of researcherInfo.affiliation"
                :key="'a' + i"
              >
                <router-link :to="`/affiliations/${affiliation.id}`">
                  {{ affiliation.name }}
                </router-link>
              </li>
            </ul>
            <!--代表作-->
            <p>
              <strong>5 Selected Papers:</strong>
              <span v-if="researcherInfo.papers.length === 0">
                暂无数据
              </span>
            </p>
            <ul>
              <li v-for="(paper, i) of researcherInfo.papers" :key="'p' + i">
                <router-link :to="`/papers/${paper.id}`">
                  {{ paper.title }}
                </router-link>
              </li>
            </ul>
            <!--领域-->
            <p>
              <strong>5 Selected Domains:</strong>
              <span v-if="researcherInfo.domains.length === 0">
                暂无数据
              </span>
            </p>
            <ul>
              <li v-for="(domain, i) of researcherInfo.domains" :key="'d' + i">
                <router-link :to="`/domains/${domain.id}`">
                  {{ domain.name }}
                </router-link>
              </li>
            </ul>
          </el-card>
        </el-tab-pane>
        <el-tab-pane
          label="历史论文"
          name="papers"
          :disabled="!researcherInfo.id"
          lazy
        >
          <researcher-papers :id="researcherInfo.id" />
        </el-tab-pane>
        <el-tab-pane
          label="历史机构"
          name="affiliations"
          :disabled="!researcherInfo.id"
          lazy
        >
          <researcher-affiliations :id="researcherInfo.id" />
        </el-tab-pane>
        <el-tab-pane
          label="历史领域"
          name="domains"
          :disabled="!researcherInfo.id"
          lazy
        >
          <researcher-domains :id="researcherInfo.id" />
        </el-tab-pane>
        <el-tab-pane
          label="历史合作"
          name="partnership"
          :disabled="!researcherInfo.id"
          lazy
        >
          <researcher-partnership
            :id="researcherInfo.id"
            :impact="researcherImpact"
            @refresh="switchTab"
          />
        </el-tab-pane>
        <el-tab-pane
          label="领域预测"
          name="domain-prediction"
          :disabled="!researcherInfo.id"
          lazy
        >
          <researcher-domains-prediction :id="researcherInfo.id" />
        </el-tab-pane>
        <el-tab-pane
          label="合作预测"
          name="partnership-prediction"
          :disabled="!researcherInfo.id"
          lazy
        >
          <researcher-partnership-prediction
            :id="researcherInfo.id"
            @refresh="switchTab"
          />
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Card, Header, Main, TabPane, Tabs } from "element-ui";
import { ResearcherDisplay } from "@/interfaces/researchers";
import AffiliationsAPI from "@/api/affiliations";
import DomainsAPI from "@/api/domains";
import PapersAPI from "@/api/papers";
import ResearcherAPI from "@/api/researchers";

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
      import("@/components/ResearcherPartnership.vue"),
    ResearcherPartnershipPrediction: () =>
      import("@/components/ResearcherPartnershipPrediction.vue")
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
      } as ResearcherDisplay,
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
        case "domain-prediction":
          return "领域预测";
        case "partnership":
          return "合作关系";
        case "partnership-prediction":
          return "合作预测";
        default:
          return "未知";
      }
    }
  },
  watch: {
    id() {
      this.fetchResearcher(this.id);
    }
  },
  mounted() {
    this.fetchResearcher(this.id);
  },
  methods: {
    async fetchResearcher(id: string) {
      this.isLoading = true;
      try {
        // 因为提供了详情的其他接口，所以这里用一个 basic 接口凑合一下
        const researcherInfo = (await ResearcherAPI.getBasicInfoById(id)).data;
        this.researcherInfo.id = researcherInfo.id;
        this.researcherInfo.name = researcherInfo.name;
        // 这里可能会存在严重的性能问题，但是鉴于目前的数据量不是很大，应该不会造成非常严重的后果
        // 机构
        const affiliationsBasicInfoReqs = researcherInfo.affiliation.map(id =>
          AffiliationsAPI.getBasicInfoById(id)
        );
        setTimeout(async () => {
          const affiliationsRes = await Promise.all(affiliationsBasicInfoReqs);
          this.researcherInfo.affiliation = affiliationsRes.map(
            res => res.data
          );
        }, 0);
        // 论文
        const papersBasicInfoReqs = researcherInfo.papers.map(id =>
          PapersAPI.getBasicInfoById(id)
        );
        setTimeout(async () => {
          const papersRes = await Promise.all(papersBasicInfoReqs);
          this.researcherInfo.papers = papersRes.map(res => res.data);
        }, 0);
        // 领域
        // 选取前 5 个
        const domainsBasicInfoReqs = researcherInfo.domains
          .slice(0, 5)
          .map(id => DomainsAPI.getBasicInfoById(id));
        setTimeout(async () => {
          const domainsRes = await Promise.all(domainsBasicInfoReqs);
          this.researcherInfo.domains = domainsRes.map(res => res.data);
        }, 0);
        // 影响力
        setTimeout(async () => {
          const impactRes = await ResearcherAPI.getImpact(researcherInfo.id);
          this.researcherImpact = impactRes.data.toString();
        }, 0);
      } catch (e) {
        console.log(e.toString());
      } finally {
        this.isLoading = false;
      }
    },
    switchTab(name = "detail") {
      this.activeTabName = name;
    }
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
