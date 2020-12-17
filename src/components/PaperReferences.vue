<template>
  <!--TODO: 可以考虑换成关系图-->
  <el-card class="result-card" v-loading="isLoading">
    <template #header>
      <h3>引用关系</h3>
    </template>
    <ol v-if="references.length > 0">
      <li v-for="(paper, i) of references" :key="i">
        {{ paper }}
      </li>
    </ol>
    <p v-else>暂无引用文献</p>
  </el-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Card } from "element-ui";

export default Vue.extend({
  name: "PaperReferences",
  props: {
    references: Array // types: string[]
  },
  components: {
    [Card.name]: Card
  },
  data() {
    return {
      isLoading: false
    };
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
