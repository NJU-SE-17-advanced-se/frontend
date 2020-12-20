<template>
  <div class="wrapper" v-loading="isLoading">
    <template v-if="affiliationsBasicInfo.length > 0">
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
        <el-button
          type="primary"
          class="result-button"
          @click="$router.push(`/affiliations/${affiliation.id}`)"
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
import { AffiliationBasic } from "@/interfaces/affiliations";
import AffiliationAPI from "@/api/affiliations";

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
    async fetchSearchResult(keyword: string, page = 1) {
      console.log("fetching", "affiliations", keyword, page);
      this.isLoading = true;
      try {
        const affiliationSearchRes = await AffiliationAPI.search(keyword, page);
        const affiliationIds = affiliationSearchRes.data.ids;
        // 每一页数量必然在 0 - 10（约定）
        const affiliationsBasicInfoReqs = affiliationIds.map(id =>
          AffiliationAPI.getBasicInfoById(id)
        );
        // HTTP/1.1 浏览器最大连接数大致为 4 - 6，取最小值
        const reqBatch1 = Promise.all(affiliationsBasicInfoReqs.slice(0, 4));
        const reqBatch2 = Promise.all(affiliationsBasicInfoReqs.slice(4, 7));
        const reqBatch3 = Promise.all(affiliationsBasicInfoReqs.slice(7, 10));
        const res1 = await reqBatch1;
        const res2 = await reqBatch2;
        const res3 = await reqBatch3;
        this.affiliationsBasicInfo = [...res1, ...res2, ...res3].map(
          res => res.data
        );
        // 为了在 JSX 中解析，此处事件名称必须为 camelCase
        // 并且我不想引入一个新的库
        this.$emit("totalChange", affiliationSearchRes.data.count);
      } catch (e) {
        console.log(e.toString());
      } finally {
        this.isLoading = false;
      }
    },
    getLimitedLengthDescription(desc: string) {
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
