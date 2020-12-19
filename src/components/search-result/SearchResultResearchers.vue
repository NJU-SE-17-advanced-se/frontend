<template>
  <div class="wrapper" v-loading="isLoading">
    <template v-if="researchersBasicInfo.length > 0">
      <el-card
        v-for="(researcher, i) of researchersBasicInfo"
        :key="i"
        class="result-card"
      >
        <template #header>
          <router-link :to="`/researchers/${researcher.id}`">
            <strong>{{ researcher.name }}</strong>
          </router-link>
        </template>
        <!--机构-->
        <p>
          <strong>Affiliations:</strong>
          <span v-if="researcher.affiliation.length === 0"> 暂无数据</span>
        </p>
        <ul>
          <li
            v-for="(affiliation, i) of researcher.affiliation"
            :key="researcher.id + 'a' + i"
          >
            {{ affiliation }}
          </li>
        </ul>
        <!--论文-->
        <p>
          <strong>Papers:</strong>
          <span v-if="researcher.papers.length === 0"> 暂无数据</span>
        </p>
        <ul>
          <li
            v-for="(paper, i) of researcher.papers"
            :key="researcher.id + 'p' + i"
          >
            {{ paper }}
          </li>
        </ul>
        <!--领域-->
        <p>
          <strong>Domains:</strong>
          <span v-if="researcher.domains.length === 0"> 暂无数据</span>
        </p>
        <ul>
          <li
            v-for="(domain, i) of researcher.domains"
            :key="domain.id + 'd' + i"
          >
            {{ domain }}
          </li>
        </ul>
        <el-button
          type="primary"
          class="result-button"
          @click="$router.push(`/researchers/${researcher.id}`)"
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
import { ResearcherBasic } from "@/interfaces/researchers";
import AffiliationAPI from "@/api/affiliations";
import DomainAPI from "@/api/domains";
import PaperAPI from "@/api/papers";
import ResearcherAPI from "@/api/researchers";

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
      isLoading: false,
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
    async fetchSearchResult(keyword: string, page = 1) {
      console.log("fetching", "researchers", keyword, page);
      this.isLoading = true;
      try {
        const researcherSearchRes = await ResearcherAPI.search(keyword, page);
        const researcherIds = researcherSearchRes.data.result;
        // 每一页数量必然在 0 - 10（约定）
        const researchersBasicInfoReqs = researcherIds.map(id =>
          ResearcherAPI.getBasicInfoById(id)
        );
        // HTTP/1.1 浏览器最大连接数大致为 4 - 6，取最小值
        const reqBatch1 = Promise.all(researchersBasicInfoReqs.slice(0, 4));
        const reqBatch2 = Promise.all(researchersBasicInfoReqs.slice(4, 7));
        const reqBatch3 = Promise.all(researchersBasicInfoReqs.slice(7, 10));
        const res1 = await reqBatch1;
        const res2 = await reqBatch2;
        const res3 = await reqBatch3;
        const researcherBasicInfo = [
          ...res1.map(res => res.data),
          ...res2.map(res => res.data),
          ...res3.map(res => res.data)
        ];
        // 出于性能考虑，只保留前 5 个领域
        this.researchersBasicInfo = researcherBasicInfo.map(info => ({
          ...info,
          domains: info.domains.slice(0, 5)
        }));
        // 为了在 JSX 中解析，此处事件名称必须为 camelCase
        // 并且我不想引入一个新的库
        this.$emit("totalChange", 50);
        // 根据 id 更新论文其他信息
        this.researchersBasicInfo.forEach(researcher => {
          setTimeout(async () => {
            researcher = await this.fetchPaperBasicMoreDetailInfo(researcher);
          }, 0);
        });
      } catch (e) {
        console.log(e.toString());
      } finally {
        this.isLoading = false;
      }
    },
    async fetchPaperBasicMoreDetailInfo(researcher: ResearcherBasic) {
      try {
        // 假设不会出现很多机构，否则该方法大概率会出现性能问题
        const affiliationReqs = researcher.affiliation.map(id =>
          AffiliationAPI.getBasicInfoById(id)
        );
        const paperReqs = researcher.papers.map(id =>
          PaperAPI.getBasicInfoById(id)
        );
        const domainReqs = researcher.domains.map(id =>
          DomainAPI.getBasicInfoById(id)
        );
        const affiliationReq = Promise.all(affiliationReqs);
        const paperReq = Promise.all(paperReqs);
        const domainReq = Promise.all(domainReqs);
        const affiliationRes = await affiliationReq;
        const paperRes = await paperReq;
        const domainRes = await domainReq;
        researcher.affiliation = affiliationRes.map(
          affiliation => affiliation.data.name
        );
        researcher.papers = paperRes.map(paper => paper.data.title);
        researcher.domains = domainRes.map(domain => domain.data.name);
      } catch (e) {
        console.log(e.toString());
      }
      return researcher;
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
