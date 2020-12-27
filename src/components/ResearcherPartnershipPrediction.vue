<template>
  <div class="wrapper">
    <el-card class="result-card" v-loading="isLoading">
      <template #header>
        <h3>该学者未来可能的合作学者</h3>
      </template>
      <ul>
        <li v-for="researcher of partnershipInfo" :key="researcher.id">
          <router-link :to="`/researchers/${researcher.id}`">
            {{ researcher.name }}
          </router-link>
          ,{{ researcher.prob }}
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
import ResearchersAPI from "@/api/researchers";

type PartnershipItem = ResearcherBasic & {
  prob: string;
};

export default Vue.extend({
  name: "ResearcherPartnershipPrediction",
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
      partnershipInfo: [] as PartnershipItem[]
    };
  },
  watch: {
    id() {
      this.fetchPartnership(this.id);
      // 回到详情页
      this.$emit("refresh");
    }
  },
  mounted() {
    this.fetchPartnership(this.id);
  },
  methods: {
    async fetchPartnership(id: string) {
      this.isLoading = true;
      try {
        const partnershipRes = (await ResearchersAPI.predictPartners(id)).data;
        // 总概率，用于计算比例
        const totalProb = Object.values(partnershipRes).reduce(
          (prev, current) => prev + current,
          0
        );
        // 按概率从大到小排序
        const partnershipBasicInfoReqs = Object.keys(partnershipRes)
          .sort((a, b) => partnershipRes[b] - partnershipRes[a])
          .map(id => ResearchersAPI.getBasicInfoById(id));
        setTimeout(async () => {
          const partnershipBasicInfoRes = await Promise.all(
            partnershipBasicInfoReqs
          );
          // 保留两位小数
          this.partnershipInfo = partnershipBasicInfoRes
            .map(res => ({
              ...res.data,
              prob:
                ((partnershipRes[res.data.id] / totalProb) * 100).toFixed(2) +
                "%"
            }))
            .sort((a, b) => Number(a.prob < b.prob));
          this.isLoading = false;
        }, 0);
      } catch (e) {
        console.log(e.toString());
        this.isLoading = false;
      }
    }
  }
});
</script>

<style scoped lang="less">
.wrapper {
  min-height: 70vh;

  .result-card {
    margin-bottom: 40px;

    .result-button {
      float: right;
      margin-bottom: 20px;
    }
  }
}
</style>
