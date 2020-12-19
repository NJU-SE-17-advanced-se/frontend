<template>
  <div class="wrapper">
    <el-header>
      <el-button type="primary" style="float: left" @click="$router.go(-1)">
        <i class="el-icon-back" /> 返回
      </el-button>
      <h1 style="text-align: center">出版物详情</h1>
    </el-header>
    <el-main>
      <el-card class="result-card" v-loading="isLoading">
        <template #header>
          <h2>{{ publicationInfo.name }}</h2>
        </template>
        <p>
          <strong>Publication:</strong> {{ publicationInfo.publicationDate }}
        </p>
        <p><strong>OASIS-impact:</strong> {{ publicationInfo.impact }}</p>
        <!--论文-->
        <p>
          <strong>Papers:</strong>
          <span v-if="publicationInfo.papers.length === 0">暂无数据</span>
        </p>
        <ul>
          <li v-for="(paper, i) of publicationInfo.papers" :key="i">
            {{ paper }}
          </li>
        </ul>
      </el-card>
    </el-main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Publication } from "@/interfaces/publications";
import { Card, Header, Main } from "element-ui";

export default Vue.extend({
  name: "Publication",
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
      publicationInfo: {
        id: "",
        name: "",
        publicationDate: "",
        impact: 0,
        papers: []
      } as Publication
    };
  },
  mounted() {
    this.isLoading = true;
    setTimeout(() => {
      this.publicationInfo = {
        id: "32_7058460",
        name: "IEEE Transactions on Software Engineering",
        publicationDate: "2015",
        impact: -1,
        papers: [
          "6915751",
          "6926798",
          "6926828",
          "6926851",
          "6930767",
          "6936339"
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
