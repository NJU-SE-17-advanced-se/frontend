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
        <li v-for="affiliation of affiliationInfo" :key="affiliation.id">
          <router-link :to="`/affiliations/${affiliation.id}`">
            {{ affiliation.name }}
          </router-link>
        </li>
      </ul>
      <p v-if="affiliationInfo.length === 0">暂无数据</p>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Card, DatePicker } from "element-ui";
import { AffiliationBasic } from "@/interfaces/affiliations";
import { errorMsg } from "@/utils/message";
import AffiliationsAPI from "@/api/affiliations";
import ResearchersAPI from "@/api/researchers";

export default Vue.extend({
  name: "ResearcherAffiliations",
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
      affiliationInfo: [] as AffiliationBasic[]
    };
  },
  watch: {
    startDate() {
      this.fetchAffiliations(this.id, this.startDate, this.endDate);
    },
    endDate() {
      this.fetchAffiliations(this.id, this.startDate, this.endDate);
    }
  },
  mounted() {
    this.fetchAffiliations(this.id, this.startDate, this.endDate);
  },
  methods: {
    async fetchAffiliations(id: string, start: string, end: string) {
      if (!start) {
        errorMsg("请选择开始年份");
      } else if (!end) {
        errorMsg("请选择结束年份");
      } else if (new Date(start) > new Date(end)) {
        errorMsg("开始年份不能在结束年份之后");
      } else {
        const affiliationsIds = (
          await ResearchersAPI.getAffiliationsByTimeRange(id, start, end)
        ).data;
        const affiliationsBasicInfoReqs = affiliationsIds.map(id =>
          AffiliationsAPI.getBasicInfoById(id)
        );
        setTimeout(async () => {
          const affiliationsRes = await Promise.all(affiliationsBasicInfoReqs);
          this.affiliationInfo = affiliationsRes.map(res => res.data);
        }, 0);
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
