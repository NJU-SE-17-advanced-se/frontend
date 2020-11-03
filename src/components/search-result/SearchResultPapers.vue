<template>
  <div>
    <el-card
      v-for="(paper, i) of papersBasicInfo"
      :key="i"
      style="margin-bottom: 40px"
    >
      <template #header>
        <strong>{{ paper.title }}</strong>
      </template>
      <p><strong>Publication Date:</strong> {{ paper.publicationDate }}</p>
      <p><strong>Abstract:</strong> {{ getLimitedLengthAbs(paper.abs) }}</p>
      <p><strong>Citation:</strong> {{ paper.citation }}</p>
      <el-button
        type="primary"
        size="small"
        style="float:right; margin-bottom: 20px"
      >
        View Detail
      </el-button>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Card } from "element-ui";

export default Vue.extend({
  name: "SearchResultPapers",
  props: {
    keyword: String,
    page: Number
  },
  components: {
    [Card.name]: Card
  },
  data() {
    return {
      papersBasicInfo: [
        { abs: "123" },
        { abs: "123" },
        { abs: "123" },
        { abs: "123" },
        { abs: "123" }
      ]
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
      console.log("fetching", "papers", keyword, page);
    },
    getLimitedLengthAbs(abs: string) {
      // 截取前500个字符，相当于前100词左右
      // 据某统计数据表示，平均单词长度为4-5个字母
      const LIMIT = 500;
      return abs.length > LIMIT ? abs.substr(0, LIMIT) + "..." : abs;
    }
  }
});
</script>
