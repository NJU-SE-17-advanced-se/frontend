<template>
  <div class="wrapper">
    <el-card
      v-for="(researcher, i) of researchersBasicInfo"
      :key="i"
      class="result-card"
    >
      <template #header>
        <router-link :to="researcher.id">
          <strong>{{ researcher.name }}</strong>
        </router-link>
      </template>
      <p>
        <strong>Affiliations:</strong>
        {{ researcher.affiliation }}
      </p>
      <p><strong>Papers:</strong> {{ researcher.papers }}</p>
      <p><strong>Domains:</strong> {{ researcher.domains }}</p>
      <el-button type="primary" class="result-button">详情</el-button>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Card } from "element-ui";
import { ResearcherBasic } from "@/interfaces/researchers";

export default Vue.extend({
  name: "SearchResultResearchers",
  props: {
    keyword: String,
    page: Number
  },
  components: {
    [Card.name]: Card
  },
  data() {
    return {
      researchersBasicInfo: [] as ResearcherBasic[]
    };
  },
  watch: {
    keyword() {
      this.fetchSearchResult(this.keyword, this.page);
    },
    page() {
      this.fetchSearchResult(this.keyword, this.page);
    }
  },
  mounted() {
    this.fetchSearchResult(this.keyword, this.page);
  },
  methods: {
    // 获取搜索结果
    fetchSearchResult(keyword: string, page = 1) {
      console.log("fetching", "publications", keyword, page);
      setTimeout(() => {
        this.researchersBasicInfo = [
          {
            id: "37085493646",
            name: "Jun Sun",
            affiliation: [
              "15eab2386ce336f6400882f31a7d983b",
              "2909598c2cfa81a4d1e2416e7e98b7e6",
              "f6202fe0cd85555ca7f9aa66ea9891d7"
            ],
            papers: ["8115652", "7371996", "8115657", "8115689", "8115690"],
            domains: [
              "19fc833ffe525d768089c7327a6e73d5",
              "6bdb7dbddcd02a417438b5bbfe421548",
              "cc801bd8b3e2970a29e5346ff2068dc8",
              "040c40f463cdc06ada8ce410af3660cd",
              "1c3abc1b9a938b3d89f1f3a504d9eb40",
              "d52387880e1ea22817a72d3759213819",
              "dea0a476bf5226975bf9ae2076aa5c4a",
              "0a7ee1ff73ce79a8a41000817f196eaa",
              "250578a8829fa22053c85ec827c952f5",
              "467ffcb9fcbaefca498ccb9dca64ae0b",
              "59af87a0d3e20648d118a012f78a7a64",
              "fcdce8503adaff3a698b808c18a61508",
              "5e6db9c70b8e1f48c8a6ef3949377851",
              "ae506cdc364fa9ba0b8184d8e2245d2c",
              "c9847bb8b7875a4a0b995ae9b6bc45f6",
              "f28059135382420bdcca0b59acdbb85b",
              "1c9ee2ad18f6f7d86fabd4bb09672f60"
            ]
          },
          {
            id: "37085493646",
            name: "Jun Sun",
            affiliation: [
              "15eab2386ce336f6400882f31a7d983b",
              "2909598c2cfa81a4d1e2416e7e98b7e6",
              "f6202fe0cd85555ca7f9aa66ea9891d7"
            ],
            papers: ["8115652", "7371996", "8115657", "8115689", "8115690"],
            domains: [
              "19fc833ffe525d768089c7327a6e73d5",
              "6bdb7dbddcd02a417438b5bbfe421548",
              "cc801bd8b3e2970a29e5346ff2068dc8",
              "040c40f463cdc06ada8ce410af3660cd",
              "1c3abc1b9a938b3d89f1f3a504d9eb40",
              "d52387880e1ea22817a72d3759213819",
              "dea0a476bf5226975bf9ae2076aa5c4a",
              "0a7ee1ff73ce79a8a41000817f196eaa",
              "250578a8829fa22053c85ec827c952f5",
              "467ffcb9fcbaefca498ccb9dca64ae0b",
              "59af87a0d3e20648d118a012f78a7a64",
              "fcdce8503adaff3a698b808c18a61508",
              "5e6db9c70b8e1f48c8a6ef3949377851",
              "ae506cdc364fa9ba0b8184d8e2245d2c",
              "c9847bb8b7875a4a0b995ae9b6bc45f6",
              "f28059135382420bdcca0b59acdbb85b",
              "1c9ee2ad18f6f7d86fabd4bb09672f60"
            ]
          },
          {
            id: "37085493646",
            name: "Jun Sun",
            affiliation: [
              "15eab2386ce336f6400882f31a7d983b",
              "2909598c2cfa81a4d1e2416e7e98b7e6",
              "f6202fe0cd85555ca7f9aa66ea9891d7"
            ],
            papers: ["8115652", "7371996", "8115657", "8115689", "8115690"],
            domains: [
              "19fc833ffe525d768089c7327a6e73d5",
              "6bdb7dbddcd02a417438b5bbfe421548",
              "cc801bd8b3e2970a29e5346ff2068dc8",
              "040c40f463cdc06ada8ce410af3660cd",
              "1c3abc1b9a938b3d89f1f3a504d9eb40",
              "d52387880e1ea22817a72d3759213819",
              "dea0a476bf5226975bf9ae2076aa5c4a",
              "0a7ee1ff73ce79a8a41000817f196eaa",
              "250578a8829fa22053c85ec827c952f5",
              "467ffcb9fcbaefca498ccb9dca64ae0b",
              "59af87a0d3e20648d118a012f78a7a64",
              "fcdce8503adaff3a698b808c18a61508",
              "5e6db9c70b8e1f48c8a6ef3949377851",
              "ae506cdc364fa9ba0b8184d8e2245d2c",
              "c9847bb8b7875a4a0b995ae9b6bc45f6",
              "f28059135382420bdcca0b59acdbb85b",
              "1c9ee2ad18f6f7d86fabd4bb09672f60"
            ]
          },
          {
            id: "37085493646",
            name: "Jun Sun",
            affiliation: [
              "15eab2386ce336f6400882f31a7d983b",
              "2909598c2cfa81a4d1e2416e7e98b7e6",
              "f6202fe0cd85555ca7f9aa66ea9891d7"
            ],
            papers: ["8115652", "7371996", "8115657", "8115689", "8115690"],
            domains: [
              "19fc833ffe525d768089c7327a6e73d5",
              "6bdb7dbddcd02a417438b5bbfe421548",
              "cc801bd8b3e2970a29e5346ff2068dc8",
              "040c40f463cdc06ada8ce410af3660cd",
              "1c3abc1b9a938b3d89f1f3a504d9eb40",
              "d52387880e1ea22817a72d3759213819",
              "dea0a476bf5226975bf9ae2076aa5c4a",
              "0a7ee1ff73ce79a8a41000817f196eaa",
              "250578a8829fa22053c85ec827c952f5",
              "467ffcb9fcbaefca498ccb9dca64ae0b",
              "59af87a0d3e20648d118a012f78a7a64",
              "fcdce8503adaff3a698b808c18a61508",
              "5e6db9c70b8e1f48c8a6ef3949377851",
              "ae506cdc364fa9ba0b8184d8e2245d2c",
              "c9847bb8b7875a4a0b995ae9b6bc45f6",
              "f28059135382420bdcca0b59acdbb85b",
              "1c9ee2ad18f6f7d86fabd4bb09672f60"
            ]
          },
          {
            id: "37085493646",
            name: "Jun Sun",
            affiliation: [
              "15eab2386ce336f6400882f31a7d983b",
              "2909598c2cfa81a4d1e2416e7e98b7e6",
              "f6202fe0cd85555ca7f9aa66ea9891d7"
            ],
            papers: ["8115652", "7371996", "8115657", "8115689", "8115690"],
            domains: [
              "19fc833ffe525d768089c7327a6e73d5",
              "6bdb7dbddcd02a417438b5bbfe421548",
              "cc801bd8b3e2970a29e5346ff2068dc8",
              "040c40f463cdc06ada8ce410af3660cd",
              "1c3abc1b9a938b3d89f1f3a504d9eb40",
              "d52387880e1ea22817a72d3759213819",
              "dea0a476bf5226975bf9ae2076aa5c4a",
              "0a7ee1ff73ce79a8a41000817f196eaa",
              "250578a8829fa22053c85ec827c952f5",
              "467ffcb9fcbaefca498ccb9dca64ae0b",
              "59af87a0d3e20648d118a012f78a7a64",
              "fcdce8503adaff3a698b808c18a61508",
              "5e6db9c70b8e1f48c8a6ef3949377851",
              "ae506cdc364fa9ba0b8184d8e2245d2c",
              "c9847bb8b7875a4a0b995ae9b6bc45f6",
              "f28059135382420bdcca0b59acdbb85b",
              "1c9ee2ad18f6f7d86fabd4bb09672f60"
            ]
          }
        ];
        // 为了在 JSX 中解析，此处事件名称必须为 camelCase
        // 并且我不想引入一个新的库
        this.$emit("totalChange", 50);
      }, 500);
    }
  }
});
</script>

<style scoped lang="less">
.wrapper {
  min-height: 70vh;

  .result-card {
    margin-bottom: 40px;

    .result-button {
      float: right;
      margin-bottom: 20px;
    }
  }
}
</style>
