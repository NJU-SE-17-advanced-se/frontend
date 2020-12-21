<template>
  <!--TODO: 可以考虑替换成关系图-->
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
        <li v-for="researcher of partnershipInfo" :key="researcher.id">
          <router-link :to="`/researchers/${researcher.id}`">
            {{ researcher.name }}
          </router-link>
        </li>
      </ul>
      <p v-if="partnershipInfo.length === 0">暂无数据</p>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Card, DatePicker } from "element-ui";
import { ResearcherBasic } from "@/interfaces/researchers";
import { errorMsg } from "@/utils/message";
import ResearchersAPI from "@/api/researchers";

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
      partnershipInfo: [] as ResearcherBasic[]
    };
  },
  watch: {
    startDate() {
      this.fetchPartnership(this.id, this.startDate, this.endDate);
    },
    endDate() {
      this.fetchPartnership(this.id, this.startDate, this.endDate);
    },
    id() {
      this.fetchPartnership(this.id, this.startDate, this.endDate);
    }
  },
  mounted() {
    this.fetchPartnership(this.id, this.startDate, this.endDate);
  },
  methods: {
    async fetchPartnership(id: string, start: string, end: string) {
      if (!start) {
        errorMsg("请选择开始年份");
      } else if (!end) {
        errorMsg("请选择结束年份");
      } else if (new Date(start) > new Date(end)) {
        errorMsg("开始年份不能在结束年份之后");
      } else {
        const partnershipRes = (
          await ResearchersAPI.getPartnersByTimeRange(id, start, end)
        ).data;
        console.log(partnershipRes);
        const partnershipBasicInfoReqs = partnershipRes.partners.map(id =>
          ResearchersAPI.getBasicInfoById(id)
        );
        setTimeout(async () => {
          const partnershipRes = await Promise.all(partnershipBasicInfoReqs);
          this.partnershipInfo = partnershipRes.map(res => res.data);
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
