<template>
  <!--TODO: 可以考虑换成关系图-->
  <el-card class="result-card" v-loading="isLoading">
    <template #header>
      <h3>引用关系</h3>
    </template>

    <h4>引用文献</h4>
    <ol v-if="references.length > 0">
      <li v-for="(paper, i) of references" :key="'p' + i">
        {{ paper }}
      </li>
    </ol>
    <p v-else>暂无引用文献</p>

    <h4>引用学者</h4>
    <ul>
      <li v-for="(researchId, i) of citedResearcherIds" :key="'r' + i">
        {{ researchId }}
      </li>
    </ul>
    <p v-if="citedResearcherIds.length === 0">暂无引用学者</p>
  </el-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Card } from "element-ui";

export default Vue.extend({
  name: "PaperReferences",
  props: {
    id: String,
    references: Array // types: string[]
  },
  components: {
    [Card.name]: Card
  },
  data() {
    return {
      isLoading: false,
      citedResearcherIds: [] as string[]
    };
  },
  mounted() {
    this.isLoading = true;
    setTimeout(() => {
      this.citedResearcherIds = ["1", "2", "3", "4", "5"];
      this.isLoading = false;
    }, 500);
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
