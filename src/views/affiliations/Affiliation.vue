<template>
  <div class="wrapper">
    <el-header>
      <el-button type="primary" style="float: left" @click="$router.go(-1)">
        <i class="el-icon-back" /> 返回
      </el-button>
      <h1 style="text-align: center">领域详情</h1>
    </el-header>
    <el-main>
      <el-card class="result-card" v-loading="isLoading">
        <template #header>
          <h2>{{ affiliationInfo.name }}</h2>
        </template>
        <p><strong>Researchers:</strong></p>
        <ul
          v-for="(researcher, i) of affiliationInfo.researchers"
          :key="'r' + i"
        >
          <li>{{ researcher }}</li>
        </ul>
        <p><strong>Papers:</strong></p>
        <ul v-for="(paper, i) of affiliationInfo.papers" :key="'p' + i">
          <li>{{ paper }}</li>
        </ul>
        <p><strong>Domains:</strong></p>
        <ul v-for="(domain, i) of affiliationInfo.domains" :key="'d' + i">
          <li>{{ domain }}</li>
        </ul>
      </el-card>
    </el-main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Card, Header, Main } from "element-ui";
import { Affiliation } from "@/interfaces/affiliations";

export default Vue.extend({
  name: "Affiliation",
  props: {
    id: String
  },
  components: {
    [Card.name]: Card,
    [Header.name]: Header,
    [Main.name]: Main
  },
  data() {
    return {
      isLoading: false,
      affiliationInfo: {
        id: "",
        name: "",
        description: "",
        researchers: [],
        papers: [],
        domains: []
      } as Affiliation
    };
  },
  mounted() {
    this.isLoading = true;
    setTimeout(() => {
      this.affiliationInfo = {
        id: "079423ca126a82dd12f9541e46640761",
        name:
          "Department of Computer and Data Sciences, Case Western Reserve University",
        description: null,
        researchers: ["37087230307", "37087235629"],
        papers: ["8952375", "8952375"],
        domains: [
          "8b4427c2cdf345e6b75ef55fbbebf05a",
          "ae506cdc364fa9ba0b8184d8e2245d2c",
          "cadafa0929f7e3c0c9cf2ad6eb45710e",
          "f2f30c2b550fc0012e3aa71c52a0f004",
          "8b4427c2cdf345e6b75ef55fbbebf05a",
          "ae506cdc364fa9ba0b8184d8e2245d2c",
          "cadafa0929f7e3c0c9cf2ad6eb45710e",
          "f2f30c2b550fc0012e3aa71c52a0f004"
        ]
      };
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
