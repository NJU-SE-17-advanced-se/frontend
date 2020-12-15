<template>
  <div class="wrapper">
    <el-header>
      <el-button type="primary" style="float: left" @click="$router.go(-1)">
        <i class="el-icon-back" /> 返回
      </el-button>
      <h1 style="text-align: center">学者详情</h1>
    </el-header>
    <el-main>
      <!--论文详情-->
      <el-card class="result-card" v-loading="isLoading">
        <template #header>
          <h2>{{ researcherInfo.name }}</h2>
        </template>
        <p><strong>Researchers:</strong></p>
        <ul
          v-for="(affiliation, i) of researcherInfo.affiliation"
          :key="'a' + i"
        >
          <li>{{ researcher }}</li>
        </ul>
        <p><strong>Papers:</strong></p>
        <ul v-for="(paper, i) of researcherInfo.papers" :key="'p' + i">
          <li>{{ paper }}</li>
        </ul>
        <p><strong>Domains:</strong></p>
        <ul v-for="(domain, i) of researcherInfo.domains" :key="'d' + i">
          <li>{{ domain }}</li>
        </ul>
      </el-card>
    </el-main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Card, Header, Main } from "element-ui";
import { Researcher } from "@/interfaces/researchers";

export default Vue.extend({
  name: "Researcher",
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
      researcherInfo: {
        id: "",
        name: "",
        affiliation: [],
        papers: [],
        domains: []
      } as Researcher
    };
  },
  mounted() {
    this.isLoading = true;
    setTimeout(() => {
      this.researcherInfo = {
        id: "37085876994",
        name: "Jun Sun",
        affiliation: ["2909598c2cfa81a4d1e2416e7e98b7e6"],
        papers: ["7582759"],
        domains: [
          "92850b78bdc20bc1df259e9c026d1744",
          "b86df49f1c63e593d88122ef3ae50238",
          "c05fefb8e23f737b175a03597a551518",
          "dac6fd9db22d265637cc780dde4ac6ba"
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
