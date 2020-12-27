<template>
  <div class="wrapper">
    <el-card class="result-card" v-loading="isLoading">
      <template #header>
        <h3>该学者未来可能的研究领域</h3>
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
import DomainsAPI from "@/api/domains";
import ResearchersAPI from "@/api/researchers";

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
      isLoading: false,
      domainInfo: [] as DomainBasic[]
    };
  },
  watch: {
    id() {
      this.fetchDomains(this.id);
    }
  },
  mounted() {
    this.fetchDomains(this.id);
  },
  methods: {
    async fetchDomains(id: string) {
      this.isLoading = true;
      try {
        const domainsIds = (await ResearchersAPI.predictDomains(id)).data;
        const domainsBasicInfoReqs = domainsIds.map(id =>
          DomainsAPI.getBasicInfoById(id)
        );
        setTimeout(async () => {
          const domainsRes = await Promise.all(domainsBasicInfoReqs);
          this.domainInfo = domainsRes.map(res => res.data);
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
