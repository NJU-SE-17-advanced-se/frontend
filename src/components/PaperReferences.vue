<template>
  <!--TODO: 可以考虑换成关系图-->
  <el-card class="result-card" v-loading="isLoading">
    <template #header>
      <h3>引用文献</h3>
    </template>
    <ol v-if="references.length > 0">
      <li v-for="(paper, i) of referencesInfo" :key="'p' + i">
        <router-link :to="`/papers/${paper.id}`">
          {{ paper.title }}
        </router-link>
      </li>
    </ol>
    <p v-else>暂无引用文献</p>
  </el-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Card } from "element-ui";
import { PaperBasic } from "@/interfaces/papers";
import PapersAPI from "@/api/papers";

export default Vue.extend({
  name: "PaperReferences",
  props: {
    id: String, // 此属性冗余
    references: Array // types: string[]
  },
  components: {
    [Card.name]: Card
  },
  data() {
    return {
      isLoading: false,
      referencesInfo: [] as PaperBasic[]
    };
  },
  // 处理路由变化时的行为
  watch: {
    id() {
      this.fetchReferences();
      // 回到详情页
      this.$emit("refresh");
    }
  },
  mounted() {
    this.fetchReferences();
  },
  methods: {
    async fetchReferences() {
      this.isLoading = true;
      try {
        // 因为数据量不是很大，所以不会成为非常严重的性能问题
        const referencesBasicInfoReqs = (this.references as string[]).map(id =>
          PapersAPI.getBasicInfoById(id)
        );
        setTimeout(async () => {
          const papersRes = await Promise.all(referencesBasicInfoReqs);
          this.referencesInfo = papersRes.map(res => res.data);
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

<style scoped lang="less">
.wrapper {
  min-height: 60vh;

  .result-card {
    min-height: 60vh;
    margin-bottom: 20px;

    .result-button {
      float: right;
      margin-bottom: 20px;
    }
  }
}
</style>
