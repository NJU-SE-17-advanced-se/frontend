<template>
  <div class="wrapper">
    <el-header>
      <el-button type="primary" style="float: left" @click="$router.go(-1)">
        <i class="el-icon-back" /> 返回
      </el-button>
      <h1 style="text-align: center">机构详情</h1>
    </el-header>
    <el-main>
      <el-card class="result-card" v-loading="isLoading">
        <template #header>
          <h2>{{ affiliationInfo.name }}</h2>
        </template>
        <!--描述-->
        <p>
          <strong>Description:</strong>
          <span v-if="!affiliationInfo.description">
            暂无数据
          </span>
        </p>
        <!--学者-->
        <p>
          <strong>Researchers:</strong>
          <span v-if="affiliationInfo.researchers.length === 0">
            暂无数据
          </span>
        </p>
        <ul>
          <li
            v-for="(researcher, i) of affiliationInfo.researchers"
            :key="'r' + i"
          >
            <router-link :to="`/researchers/${researcher.id}`">
              {{ researcher.name }}
            </router-link>
          </li>
        </ul>
        <!--论文-->
        <p>
          <strong>Papers:</strong>
          <span v-if="affiliationInfo.papers.length === 0">
            暂无数据
          </span>
        </p>
        <ul>
          <li v-for="(paper, i) of affiliationInfo.papers" :key="'p' + i">
            <router-link :to="`/papers/${paper.id}`">
              {{ paper.title }}
            </router-link>
          </li>
        </ul>
        <!--领域-->
        <p>
          <strong>Domains:</strong>
          <span v-if="affiliationInfo.domains.length === 0">
            暂无数据
          </span>
        </p>
        <ul>
          <li v-for="(domain, i) of affiliationInfo.domains" :key="'d' + i">
            <router-link :to="`/domains/${domain.id}`">
              {{ domain.name }}
            </router-link>
          </li>
        </ul>
      </el-card>
    </el-main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Card, Header, Main } from "element-ui";
import { AffiliationDisplay } from "@/interfaces/affiliations";
import AffiliationAPI from "@/api/affiliations";
import DomainsAPI from "@/api/domains";
import PapersAPI from "@/api/papers";
import ResearcherAPI from "@/api/researchers";

export default Vue.extend({
  name: "Affiliation",
  props: {
    id: String
  },
  components: {
    [Card.name]: Card,
    [Header.name]: Header,
    [Main.name]: Main
  },
  data() {
    return {
      isLoading: false,
      affiliationInfo: {
        id: "",
        name: "未知机构",
        description: "暂无描述",
        researchers: [],
        papers: [],
        domains: []
      } as AffiliationDisplay
    };
  },
  mounted() {
    this.fetchAffiliation(this.id);
  },
  methods: {
    async fetchAffiliation(id: string) {
      this.isLoading = true;
      try {
        const affiliationInfo = (await AffiliationAPI.getInfoById(id)).data;
        this.affiliationInfo.id = affiliationInfo.id;
        this.affiliationInfo.name = affiliationInfo.name;
        this.affiliationInfo.description = affiliationInfo.description;
        // 这里可能会存在严重的性能问题，但是鉴于目前的数据量不是很大，应该不会造成非常严重的后果
        // 从上到下分批加载
        // 学者
        const researchersBasicInfoReqs = affiliationInfo.researchers.map(id =>
          ResearcherAPI.getBasicInfoById(id)
        );
        setTimeout(async () => {
          const researchersRes = await Promise.all(researchersBasicInfoReqs);
          this.affiliationInfo.researchers = researchersRes.map(
            res => res.data
          );
        }, 0);
        // 论文
        const papersBasicInfoReqs = affiliationInfo.papers.map(id =>
          PapersAPI.getBasicInfoById(id)
        );
        setTimeout(async () => {
          const papersRes = await Promise.all(papersBasicInfoReqs);
          this.affiliationInfo.papers = papersRes.map(res => res.data);
        }, 0);
        // 领域
        const domainsBasicInfoReqs = affiliationInfo.domains.map(id =>
          DomainsAPI.getBasicInfoById(id)
        );
        setTimeout(async () => {
          const domainsRes = await Promise.all(domainsBasicInfoReqs);
          this.affiliationInfo.domains = domainsRes.map(res => res.data);
        }, 0);
      } catch (e) {
        console.log(e.toString());
      } finally {
        this.isLoading = false;
      }
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
