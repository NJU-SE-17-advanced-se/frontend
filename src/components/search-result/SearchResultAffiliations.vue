<template>
  <div class="wrapper" v-loading="isLoading">
    <el-card
      v-for="(affiliation, i) of affiliationsBasicInfo"
      :key="i"
      class="result-card"
    >
      <template #header>
        <router-link :to="`/affiliations/${affiliation.id}`">
          <strong>{{ affiliation.name }}</strong>
        </router-link>
      </template>
      <p>
        <strong>Description:</strong>
        {{
          affiliation.description
            ? getLimitedLengthDescription(affiliation.description)
            : "暂无简介"
        }}
      </p>
      <el-button type="primary" class="result-button">详情</el-button>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Card } from "element-ui";
import { AffiliationBasic } from "@/interfaces/affiliations";

export default Vue.extend({
  name: "SearchResultAffiliations",
  props: {
    keyword: String,
    page: Number
  },
  components: {
    [Card.name]: Card
  },
  data() {
    return {
      isLoading: false,
      affiliationsBasicInfo: [] as AffiliationBasic[]
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
      console.log("fetching", "affiliations", keyword, page);
      this.isLoading = true;
      setTimeout(() => {
        this.affiliationsBasicInfo = [
          {
            id: "9bd189405e91f3902f48a91fe1b83d1c",
            name:
              "Guangdong Key Laboratory for Big Data Analysis and Simulation of Public Opinion",
            description: null
          },
          {
            id: "9bd189405e91f3902f48a91fe1b83d1c",
            name:
              "Guangdong Key Laboratory for Big Data Analysis and Simulation of Public Opinion",
            description: null
          },
          {
            id: "9bd189405e91f3902f48a91fe1b83d1c",
            name:
              "Guangdong Key Laboratory for Big Data Analysis and Simulation of Public Opinion",
            description: null
          },
          {
            id: "9bd189405e91f3902f48a91fe1b83d1c",
            name:
              "Guangdong Key Laboratory for Big Data Analysis and Simulation of Public Opinion",
            description: null
          },
          {
            id: "9bd189405e91f3902f48a91fe1b83d1c",
            name:
              "Guangdong Key Laboratory for Big Data Analysis and Simulation of Public Opinion",
            description: null
          }
        ];
        // 为了在 JSX 中解析，此处事件名称必须为 camelCase
        // 并且我不想引入一个新的库
        this.$emit("totalChange", 50);
        this.isLoading = false;
      }, 500);
    },
    getLimitedLengthDescription(desc: string) {
      console.log(desc);
      // 截取前500个字符，相当于前100词左右
      // 据某统计数据表示，平均单词长度为4-5个字母
      const LIMIT = 500;
      return desc.length > LIMIT ? desc.substr(0, LIMIT) + "..." : desc;
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
