<template>
  <div class="wrapper">
    <el-card class="result-card" v-loading="isLoading">
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
        <li v-for="paper of papersInfo" :key="paper.id">
          <router-link :to="`/papers/${paper.id}`">
            {{ paper.title }}
          </router-link>
        </li>
      </ul>
      <p v-if="papersInfo.length === 0">暂无数据</p>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Card, DatePicker } from "element-ui";
import { PaperBasic } from "@/interfaces/papers";
import { errorMsg } from "@/utils/message";
import PapersAPI from "@/api/papers";
import ResearchersAPI from "@/api/researchers";

export default Vue.extend({
  name: "ResearcherPapers",
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
      isLoading: false,
      startDate: currentYearStr,
      endDate: currentYearStr,
      papersInfo: [] as PaperBasic[]
    };
  },
  watch: {
    startDate() {
      this.fetchPapers(this.id, this.startDate, this.endDate);
    },
    endDate() {
      this.fetchPapers(this.id, this.startDate, this.endDate);
    },
    id() {
      this.fetchPapers(this.id, this.startDate, this.endDate);
    }
  },
  mounted() {
    this.fetchPapers(this.id, this.startDate, this.endDate);
  },
  methods: {
    async fetchPapers(id: string, start: string, end: string) {
      if (!start) {
        errorMsg("请选择开始年份");
      } else if (!end) {
        errorMsg("请选择结束年份");
      } else if (new Date(start) > new Date(end)) {
        errorMsg("开始年份不能在结束年份之后");
      } else {
        this.isLoading = true;
        try {
          const paperIds = (
            await ResearchersAPI.getPapersByTimeRange(id, start, end)
          ).data;
          const papersBasicInfoReqs = paperIds.map(id =>
            PapersAPI.getBasicInfoById(id)
          );
          setTimeout(async () => {
            const papersRes = await Promise.all(papersBasicInfoReqs);
            this.papersInfo = papersRes.map(res => res.data);
            this.isLoading = false;
          }, 0);
        } catch (e) {
          console.log(e.toString());
          this.isLoading = false;
        }
      }
    }
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
