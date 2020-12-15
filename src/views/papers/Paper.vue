<template>
  <div class="wrapper">
    <el-header>
      <el-button type="primary" style="float: left" @click="$router.go(-1)">
        <i class="el-icon-back" /> 返回
      </el-button>
      <h1 style="text-align: center">论文详情</h1>
    </el-header>
    <el-main>
      <!--论文详情-->
      <el-card class="result-card" v-loading="isLoading">
        <template #header>
          <h2>{{ paperInfo.title }}</h2>
        </template>
        <p>
          <strong>Publication:</strong>
          {{ paperInfo.publication }}, {{ paperInfo.publicationDate }}
        </p>
        <p><strong>Authors:</strong> {{ paperInfo.researchers }}</p>
        <p><strong>Abstract:</strong> {{ paperInfo.abs }}</p>
        <p>
          <strong>Link:</strong>
          <a
            :href="`https://${paperInfo.link}`"
            target="_blank"
            rel="noopener noreferer"
          >
            {{ paperInfo.link }}
          </a>
        </p>
        <p><strong>Citation:</strong> {{ paperInfo.citations }}</p>
        <p><strong>OASIS-impact:</strong> {{ paperImpact }}</p>
      </el-card>
      <!--引用关系-->
      <el-card v-loading="isLoading">
        <template #header>
          <h3>引用关系</h3>
        </template>
        <ol v-if="paperInfo.references.length > 0">
          <li v-for="(paper, i) of paperInfo.references" :key="i">
            {{ paper }}
          </li>
        </ol>
        <p v-else>暂无引用文献</p>
      </el-card>
    </el-main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Card, Header, Main, TabPane, Tabs } from "element-ui";
import { Paper } from "@/interfaces/papers";

export default Vue.extend({
  name: "Paper",
  props: {
    id: String
  },
  components: {
    [Card.name]: Card,
    [Header.name]: Header,
    [Main.name]: Main,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane
  },
  data() {
    return {
      isLoading: false,
      paperInfo: {
        id: "",
        title: "",
        abs: "",
        publication: "",
        publicationDate: "",
        link: "",
        citations: 0,
        researchers: [],
        domains: [],
        references: []
      } as Paper,
      paperImpact: "分析中..."
    };
  },
  mounted() {
    this.isLoading = true;
    setTimeout(() => {
      this.paperInfo = {
        id: "6926828",
        title:
          "Instance Generator and Problem Representation to Improve Object Oriented Code Coverage",
        abs:
          "Search-based approaches have been extensively applied to solve the problem of software test-data generation. Yet, test-data generation for object-oriented programming (OOP) is challenging due to the features of OOP, e.g., abstraction, encapsulation, and visibility that prevent direct access to some parts of the source code. To address this problem we present a new automated search-based software test-data generation approach that achieves high code coverage for unit-class testing. We first describe how we structure the test-data generation problem for unit-class testing to generate relevant sequences of method calls. Through a static analysis, we consider only methods or constructors changing the state of the class-under-test or that may reach a test target. Then we introduce a generator of instances of classes that is based on a family of means-of-instantiation including subclasses and external factory methods. It also uses a seeding strategy and a diversification strategy to increase the likelihood to reach a test target. Using a search heuristic to reach all test targets at the same time, we implement our approach in a tool, JTExpert, that we evaluate on more than a hundred Java classes from different open-source libraries. JTExpert gives better results in terms of search time and code coverage than the state of the art, EvoSuite, which uses traditional techniques.",
        publication: "32_7058460",
        publicationDate: "2015",
        link: "doi.org/10.1109/TSE.2014.2363479",
        citations: 37,
        researchers: ["37085409760", "37727014500", "38265442300"],
        domains: [
          "1c3abc1b9a938b3d89f1f3a504d9eb40",
          "75ce875e19b3fc9ca338704bbeb69913",
          "ae506cdc364fa9ba0b8184d8e2245d2c",
          "d2c8746ae6acc28e5ec78ee6bad6cfe5",
          "d52387880e1ea22817a72d3759213819"
        ],
        references: []
      };
      this.isLoading = false;
    }, 500);
    setTimeout(() => {
      this.paperImpact = (37).toString();
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
