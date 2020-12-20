<template>
  <div class="wrapper">
    <el-header>
      <el-button type="primary" style="float: left" @click="$router.go(-1)">
        <i class="el-icon-back" /> 返回
      </el-button>
      <h1 style="text-align: center">领域详情</h1>
    </el-header>
    <el-main>
      <el-card class="result-card" v-loading="isLoading">
        <template #header>
          <h2>{{ domainInfo.name }}</h2>
        </template>
        <!--学者-->
        <p>
          <strong>Researchers:</strong>
          <span v-if="domainInfo.researchers.length === 0">
            暂无数据
          </span>
        </p>
        <ul>
          <li v-for="(researcher, i) of domainInfo.researchers" :key="'r' + i">
            <router-link :to="`/researchers/${researcher.id}`">
              {{ researcher.name }}
            </router-link>
          </li>
        </ul>
        <!--论文-->
        <p>
          <strong>Papers:</strong>
          <span v-if="domainInfo.papers.length === 0">
            暂无数据
          </span>
        </p>
        <ul>
          <li v-for="(paper, i) of domainInfo.papers" :key="'p' + i">
            <router-link :to="`/papers/${paper.id}`">
              {{ paper.title }}
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
import { DomainDisplay } from "@/interfaces/domains";
import DomainsAPI from "@/api/domains";
import ResearcherAPI from "@/api/researchers";
import PapersAPI from "@/api/papers";

export default Vue.extend({
  name: "Domain",
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
      domainInfo: {
        id: "",
        name: "未知领域",
        researchers: [],
        papers: []
      } as DomainDisplay
    };
  },
  mounted() {
    this.fetchDomain(this.id);
  },
  methods: {
    async fetchDomain(id: string) {
      this.isLoading = true;
      try {
        const domainInfo = (await DomainsAPI.getInfoById(id)).data;
        this.domainInfo.id = domainInfo.id;
        this.domainInfo.name = domainInfo.name;
        // 这里可能会存在严重的性能问题，但是鉴于目前的数据量不是很大，应该不会造成非常严重的后果
        // 从上到下分批加载
        // 学者
        const researchersBasicInfoReqs = domainInfo.researchers.map(id =>
          ResearcherAPI.getBasicInfoById(id)
        );
        setTimeout(async () => {
          const researchersRes = await Promise.all(researchersBasicInfoReqs);
          this.domainInfo.researchers = researchersRes.map(res => res.data);
        }, 0);
        // 论文
        const papersBasicInfoReqs = domainInfo.papers.map(id =>
          PapersAPI.getBasicInfoById(id)
        );
        setTimeout(async () => {
          const papersRes = await Promise.all(papersBasicInfoReqs);
          this.domainInfo.papers = papersRes.map(res => res.data);
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
