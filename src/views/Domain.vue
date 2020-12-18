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
          <h2>{{ domainInfo.name }}</h2>
        </template>
        <p><strong>Researchers:</strong></p>
        <ul v-for="(researcher, i) of domainInfo.researchers" :key="'r' + i">
          <li>{{ researcher }}</li>
        </ul>
        <p><strong>Papers:</strong></p>
        <ul v-for="(paper, i) of domainInfo.papers" :key="'p' + i">
          <li>{{ paper }}</li>
        </ul>
      </el-card>
    </el-main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Card, Header, Main } from "element-ui";
import { Domain } from "@/interfaces/domains";

export default Vue.extend({
  name: "Domain",
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
      domainInfo: {
        id: "",
        name: "",
        researchers: [],
        papers: []
      } as Domain
    };
  },
  mounted() {
    this.isLoading = true;
    setTimeout(() => {
      this.domainInfo = {
        id: "0f852eed0007725004e18675b87bef9d",
        name: "DATALOG",
        researchers: [
          "37086226284",
          "37086760852",
          "37702000200",
          "38125014600"
        ],
        papers: ["9000032"]
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
