<template>
  <el-card class="result-card" v-loading="isLoading">
    <template #header>
      <h3>相关学者</h3>
    </template>
    <ol v-if="relatedResearchers.length > 0">
      <li v-for="(researcher, i) of relatedResearchers" :key="'r' + i">
        <router-link :to="`/researchers/${researcher.id}`">
          {{ researcher.name }}
        </router-link>
      </li>
    </ol>
    <p v-else>暂无相关学者</p>
  </el-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Card } from "element-ui";
import { ResearcherBasic } from "@/interfaces/researchers";
import PapersAPI from "@/api/papers";
import ResearchersAPI from "@/api/researchers";

export default Vue.extend({
  name: "PaperRelatedResearchers",
  props: {
    id: String
  },
  components: {
    [Card.name]: Card
  },
  data() {
    return {
      isLoading: false,
      relatedResearchers: [] as ResearcherBasic[]
    };
  },
  // 处理路由变化时的行为
  watch: {
    id() {
      this.fetchRelatedResearchers();
    }
  },
  mounted() {
    this.fetchRelatedResearchers();
  },
  methods: {
    async fetchRelatedResearchers() {
      this.isLoading = true;
      try {
        // 获取引用和被引用的学者 id
        const citedResearcherIdsReq = PapersAPI.getCitedResearchers(this.id);
        const citingResearcherIdsReq = PapersAPI.getCitingPapers(this.id);
        const citedResearcherIds = (await citedResearcherIdsReq).data;
        const citingResearcherIds = (await citingResearcherIdsReq).data;
        // 获取详情
        const citedResearchersBasicInfoReqs = citedResearcherIds.map(id =>
          ResearchersAPI.getBasicInfoById(id)
        );
        const citingResearchersBasicInfoReqs = citingResearcherIds.map(id =>
          ResearchersAPI.getBasicInfoById(id)
        );
        setTimeout(async () => {
          const citedResearchersRes = await Promise.all(
            citedResearchersBasicInfoReqs
          );
          const citingResearchersRes = await Promise.all(
            citingResearchersBasicInfoReqs
          );
          this.relatedResearchers = [
            ...citedResearchersRes,
            ...citingResearchersRes
          ].map(res => res.data);
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

<style scoped></style>
