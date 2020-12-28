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
        <ul
          v-infinite-scroll="loadResearchers"
          :infinite-scroll-disabled="isResearchersScrollDisabled"
          :infinite-scroll-immediate="false"
          style="max-height: 300px; overflow: auto"
        >
          <li v-for="researcher of domainInfo.researchers" :key="researcher.id">
            <router-link :to="`/researchers/${researcher.id}`">
              {{ researcher.name }}
            </router-link>
          </li>
          <li
            v-if="isResearcherLoading"
            style="margin-top: 10px"
            class="loading"
          />
          <li v-if="noMoreResearchers" style="color: #ccc; list-style: none">
            没有更多了
          </li>
        </ul>
        <!--论文-->
        <p>
          <strong>Papers:</strong>
          <span v-if="domainInfo.papers.length === 0">
            暂无数据
          </span>
        </p>
        <ul
          v-infinite-scroll="loadPapers"
          :infinite-scroll-disabled="isPapersScrollDisabled"
          :infinite-scroll-immediate="false"
          style="max-height: 300px; overflow: auto"
        >
          <li v-for="paper of domainInfo.papers" :key="paper.id">
            <router-link :to="`/papers/${paper.id}`">
              {{ paper.title }}
            </router-link>
          </li>
          <li v-if="isPaperLoading" style="margin-top: 10px" class="loading" />
          <li v-if="noMorePapers" style="color: #ccc; list-style: none">
            没有更多了
          </li>
        </ul>
      </el-card>
    </el-main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Card, Header, InfiniteScroll, Main } from "element-ui";
import { DomainDisplay } from "@/interfaces/domains";
import DomainsAPI from "@/api/domains";
import ResearcherAPI from "@/api/researchers";
import PapersAPI from "@/api/papers";
import { ResearcherBasic } from "@/interfaces/researchers";

const RESEARCHER_BATCH_SIZE = 15;
const PAPER_BATCH_SIZE = 10;

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
  directives: {
    InfiniteScroll
  },
  data() {
    return {
      isLoading: false,
      domainInfo: {
        id: "",
        name: "未知领域",
        researchers: [],
        papers: []
      } as DomainDisplay,
      // 学者
      researcherIds: [] as string[],
      researchersBatch: 0,
      isResearcherLoading: false,
      // 论文
      papersIds: [] as string[],
      papersBatch: 0,
      isPaperLoading: false,

      count: 0, //起始页数值为0
      loading: false,
      totalPages: 5, // 取后端返回内容的总页数
      list: [] as ResearcherBasic[] // 后端返回的数组
    };
  },
  computed: {
    noMoreResearchers(): boolean {
      return (
        this.researchersBatch >=
        Math.ceil(this.researcherIds.length / RESEARCHER_BATCH_SIZE)
      );
    },
    isResearchersScrollDisabled(): boolean {
      return this.isResearcherLoading || this.noMoreResearchers;
    },
    noMorePapers(): boolean {
      return (
        this.papersBatch >= Math.ceil(this.papersIds.length / PAPER_BATCH_SIZE)
      );
    },
    isPapersScrollDisabled(): boolean {
      return this.isPaperLoading || this.noMorePapers;
    }
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
        this.researcherIds = domainInfo.researchers;
        this.papersIds = domainInfo.papers;
        // 从上到下分批加载
        setTimeout(() => {
          this.fetchResearchers();
        }, 0);
        setTimeout(() => {
          this.fetchPapers();
        }, 0);
      } catch (e) {
        console.log(e.toString());
      } finally {
        this.isLoading = false;
      }
    },
    // 学者
    loadResearchers() {
      // 等到 id 全部加载完之后再加载
      if (this.isLoading) {
        return;
      }
      this.fetchResearchers(this.papersBatch);
    },
    async fetchResearchers() {
      this.isResearcherLoading = true;
      const ids = this.researcherIds.slice(
        this.researchersBatch * RESEARCHER_BATCH_SIZE,
        (this.researchersBatch + 1) * RESEARCHER_BATCH_SIZE
      );
      console.log("researcher batch:", this.researchersBatch);
      const researchersBasicInfoReqs = ids.map(id =>
        ResearcherAPI.getBasicInfoById(id)
      );
      const researchersRes = await Promise.all(researchersBasicInfoReqs);
      // 加入现有的列表中，处理下一批
      this.domainInfo.researchers.push(...researchersRes.map(res => res.data));
      this.isResearcherLoading = false;
      this.researchersBatch += 1;
    },
    // 论文
    loadPapers() {
      // 等到 id 全部加载完之后再加载
      if (this.isLoading) {
        return;
      }
      this.fetchPapers(this.papersBatch);
    },
    async fetchPapers() {
      this.isPaperLoading = true;
      const ids = this.papersIds.slice(
        this.papersBatch * PAPER_BATCH_SIZE,
        (this.papersBatch + 1) * PAPER_BATCH_SIZE
      );
      console.log("paper batch:", this.papersBatch);
      const papersBasicInfoReqs = ids.map(id => PapersAPI.getBasicInfoById(id));
      const papersRes = await Promise.all(papersBasicInfoReqs);
      // 加入现有的列表中，处理下一批
      this.domainInfo.papers.push(...papersRes.map(res => res.data));
      this.isPaperLoading = false;
      this.papersBatch += 1;
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

  .loading {
    display: inline-block;
    width: 10px;
    height: 10px;
    border: 2px solid #409eff;
    border-left: transparent;
    animation: rotate 0.5s linear infinite;
    border-radius: 50%;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
