<template>
  <div class="wrapper">
    <el-card>
      <template #header>
        <div class="date-select">
          <el-date-picker
            v-model="startDate"
            type="year"
            placeholder="开始年份"
            value-format="yyyy"
          />
          -
          <el-date-picker
            v-model="endDate"
            type="year"
            placeholder="结束年份"
            value-format="yyyy"
          />
        </div>
      </template>
      <ul>
        <li v-for="id of partnershipIds" :key="id">
          {{ id }}
        </li>
      </ul>
      <p v-if="partnershipIds.length === 0">暂无数据</p>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Card, DatePicker } from "element-ui";

export default Vue.extend({
  name: "ResearcherPartnership",
  props: {
    id: String
  },
  components: {
    [Card.name]: Card,
    [DatePicker.name]: DatePicker
  },
  data() {
    const currentYearStr = new Date().getFullYear().toString();
    return {
      startDate: currentYearStr,
      endDate: currentYearStr,
      partnershipIds: [] as string[]
    };
  },
  mounted() {
    setTimeout(() => {
      this.partnershipIds = ["1", "2", "3", "4", "5"];
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