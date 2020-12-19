<template>
  <div class="wrapper" v-loading="isLoading">
    <template v-if="domainsBasicInfo.length > 0">
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
        <el-button
          type="primary"
          class="result-button"
          @click="$router.push(`/domains/${domain.id}`)"
        >
          详情 <i class="el-icon-right" />
        </el-button>
      </el-card>
    </template>
    <p v-else style="text-align: center; line-height: 70vh">暂无结果……</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Card } from "element-ui";
import { DomainBasic } from "@/interfaces/domains";
import DomainAPI from "@/api/domains";

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
    async fetchSearchResult(keyword: string, page = 1) {
      console.log("fetching", "domains", keyword, page);
      this.isLoading = true;
      const domainSearchRes = await DomainAPI.search(keyword, page);
      const domainIds = domainSearchRes.data.ids;
      // 每一页数量必然在 0 - 10（约定）
      const domainsBasicInfoReqs = domainIds.map(id =>
        DomainAPI.getBasicInfoById(id)
      );
      // HTTP/1.1 浏览器最大连接数大致为 4 - 6，取最小值
      const reqBatch1 = Promise.all(domainsBasicInfoReqs.slice(0, 4));
      const reqBatch2 = Promise.all(domainsBasicInfoReqs.slice(4, 7));
      const reqBatch3 = Promise.all(domainsBasicInfoReqs.slice(7, 10));
      const res1 = await reqBatch1;
      const res2 = await reqBatch2;
      const res3 = await reqBatch3;
      this.domainsBasicInfo = [
        ...res1.map(res => res.data),
        ...res2.map(res => res.data),
        ...res3.map(res => res.data)
      ];
      // 为了在 JSX 中解析，此处事件名称必须为 camelCase
      // 并且我不想引入一个新的库
      this.$emit("totalChange", domainSearchRes.data.count);
      this.isLoading = false;
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
