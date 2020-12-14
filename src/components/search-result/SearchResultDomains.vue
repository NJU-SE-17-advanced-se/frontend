<template>
  <div class="wrapper" v-loading="isLoading">
    <el-card
      v-for="(domain, i) of domainsBasicInfo"
      :key="i"
      class="result-card"
    >
      <template #header>
        <router-link :to="`/domains/${domain.id}`">
          <strong>{{ domain.name }}</strong>
        </router-link>
      </template>
      <el-button type="primary" class="result-button">详情</el-button>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Card } from "element-ui";
import { DomainBasic } from "@/interfaces/domains";

export default Vue.extend({
  name: "SearchResultDomains",
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
      domainsBasicInfo: [] as DomainBasic[]
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
      console.log("fetching", "domains", keyword, page);
      this.isLoading = true;
      setTimeout(() => {
        this.domainsBasicInfo = [
          {
            id: "29926a2c5847971bfd703e8f0a221d09",
            name: "business data processing"
          },
          {
            id: "29926a2c5847971bfd703e8f0a221d09",
            name: "business data processing"
          },
          {
            id: "29926a2c5847971bfd703e8f0a221d09",
            name: "business data processing"
          },
          {
            id: "29926a2c5847971bfd703e8f0a221d09",
            name: "business data processing"
          },
          {
            id: "29926a2c5847971bfd703e8f0a221d09",
            name: "business data processing"
          }
        ];
        // 为了在 JSX 中解析，此处事件名称必须为 camelCase
        // 并且我不想引入一个新的库
        this.$emit("totalChange", 50);
        this.isLoading = false;
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
