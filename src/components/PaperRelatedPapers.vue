<template>
  <el-card class="result-card" v-loading="isLoading">
    <template #header>
      <h3>相关论文</h3>
    </template>
    <ol v-if="relatedPapers.length > 0">
      <li v-for="(paper, i) of relatedPapers" :key="'p' + i">
        <router-link :to="`/papers/${paper.id}`">
          {{ paper.title }}
        </router-link>
      </li>
    </ol>
    <p v-else>暂无相关论文</p>
  </el-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Card } from "element-ui";
import { PaperBasic } from "@/interfaces/papers";
import PapersAPI from "@/api/papers";

export default Vue.extend({
  name: "PaperRelatedPapers",
  props: {
    id: String
  },
  components: {
    [Card.name]: Card
  },
  data() {
    return {
      isLoading: false,
      relatedPapers: [] as PaperBasic[]
    };
  },
  // 处理路由变化时的行为
  watch: {
    id() {
      this.fetchRelatedPapers();
      // 回到详情页
      this.$emit("refresh");
    }
  },
  mounted() {
    this.fetchRelatedPapers();
  },
  methods: {
    async fetchRelatedPapers() {
      this.isLoading = true;
      try {
        const citedPaperIds = (await PapersAPI.getCitedPapers(this.id)).data;
        const citedPapersBasicInfoReqs = citedPaperIds.map(id =>
          PapersAPI.getBasicInfoById(id)
        );
        setTimeout(async () => {
          const papersRes = await Promise.all(citedPapersBasicInfoReqs);
          this.relatedPapers = papersRes.map(res => res.data);
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
