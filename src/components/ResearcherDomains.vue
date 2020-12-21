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
        <li v-for="domain of domainInfo" :key="domain.id">
          <router-link :to="`/domains/${domain.id}`">
            {{ domain.name }}
          </router-link>
        </li>
      </ul>
      <p v-if="domainInfo.length === 0">暂无数据</p>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Card, DatePicker } from "element-ui";
import { DomainBasic } from "@/interfaces/domains";
import { errorMsg } from "@/utils/message";
import DomainsAPI from "@/api/domains";
import ResearchersAPI from "@/api/researchers";

export default Vue.extend({
  name: "ResearcherDomains",
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
      domainInfo: [] as DomainBasic[]
    };
  },
  watch: {
    startDate() {
      this.fetchDomains(this.id, this.startDate, this.endDate);
    },
    endDate() {
      this.fetchDomains(this.id, this.startDate, this.endDate);
    },
    id() {
      this.fetchDomains(this.id, this.startDate, this.endDate);
    }
  },
  mounted() {
    this.fetchDomains(this.id, this.startDate, this.endDate);
  },
  methods: {
    async fetchDomains(id: string, start: string, end: string) {
      if (!start) {
        errorMsg("请选择开始年份");
      } else if (!end) {
        errorMsg("请选择结束年份");
      } else if (new Date(start) > new Date(end)) {
        errorMsg("开始年份不能在结束年份之后");
      } else {
        const domainsIds = (
          await ResearchersAPI.getDomainsByTimeRange(id, start, end)
        ).data;
        const domainsBasicInfoReqs = domainsIds.map(id =>
          DomainsAPI.getBasicInfoById(id)
        );
        setTimeout(async () => {
          const domainsRes = await Promise.all(domainsBasicInfoReqs);
          this.domainInfo = domainsRes.map(res => res.data);
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
