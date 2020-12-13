<template>
  <div class="wrapper">
    <el-card
      v-for="(publication, i) of publicationsBasicInfo"
      :key="i"
      class="result-card"
    >
      <template #header>
        <router-link :to="publication.id">
          <strong>{{ publication.name }}</strong>
        </router-link>
      </template>
      <p><strong>Publication:</strong> {{ publication.publicationDate }}</p>
      <el-button type="primary" class="result-button">详情</el-button>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Card } from "element-ui";
import { PublicationBasic } from "@/interfaces/publications";

// TODO: 增加时间范围搜索
export default Vue.extend({
  name: "SearchResultPublications",
  props: {
    keyword: String,
    page: Number
  },
  components: {
    [Card.name]: Card
  },
  data() {
    return {
      publicationsBasicInfo: [] as PublicationBasic[]
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
        this.publicationsBasicInfo = [
          {
            id: "32_7004098",
            name: "IEEE Transactions on Software Engineering",
            publicationDate: "2015"
          },
          {
            id: "32_7004098",
            name: "IEEE Transactions on Software Engineering",
            publicationDate: "2015"
          },
          {
            id: "32_7004098",
            name: "IEEE Transactions on Software Engineering",
            publicationDate: "2015"
          },
          {
            id: "32_7004098",
            name: "IEEE Transactions on Software Engineering",
            publicationDate: "2015"
          },
          {
            id: "32_7004098",
            name: "IEEE Transactions on Software Engineering",
            publicationDate: "2015"
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
