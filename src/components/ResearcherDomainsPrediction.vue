<template>
  <div class="wrapper">
    <el-card>
      <template #header>
        <h3>该学者未来可能的研究方向</h3>
      </template>
      <ul>
        <li v-for="domainId of domainIds" :key="domainId">
          {{ domainId }}
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Card, DatePicker } from "element-ui";

export default Vue.extend({
  name: "ResearcherDomainsPrediction",
  props: {
    id: String
  },
  components: {
    [Card.name]: Card,
    [DatePicker.name]: DatePicker
  },
  data() {
    return {
      domainIds: [] as string[]
    };
  },
  mounted() {
    setTimeout(() => {
      this.domainIds = ["1", "2", "3", "4", "5"];
    }, 500);
  }
});
</script>

<style scoped lang="less">
.wrapper {
  min-height: 70vh;

  .date-select {
    text-align: center;
    margin-bottom: 20px;
  }

  .result-card {
    margin-bottom: 40px;

    .result-button {
      float: right;
      margin-bottom: 20px;
    }
  }
}
</style>
