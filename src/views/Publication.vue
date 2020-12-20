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
          <span v-if="publicationInfo.papers.length === 0"> 暂无数据</span>
        </p>
        <ol>
          <li v-for="(paper, i) of publicationInfo.papers" :key="i">
            <router-link :to="`/papers/${paper.id}`">
              {{ paper.title }}
            </router-link>
          </li>
        </ol>
      </el-card>
    </el-main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { PublicationDisplay } from "@/interfaces/publications";
import { Card, Header, Main } from "element-ui";
import PapersAPI from "@/api/papers";
import PublicationsAPI from "@/api/publications";

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
      } as PublicationDisplay
    };
  },
  mounted() {
    this.fetchPublication(this.id);
  },
  methods: {
    async fetchPublication(id: string) {
      this.isLoading = true;
      try {
        const publicationInfo = (await PublicationsAPI.getInfoById(id)).data;
        this.publicationInfo.id = publicationInfo.id;
        this.publicationInfo.name = publicationInfo.name;
        this.publicationInfo.publicationDate = publicationInfo.publicationDate;
        this.publicationInfo.impact = publicationInfo.impact;
        // 这里可能会存在严重的性能问题，但是鉴于目前的数据量不是很大，应该不会造成非常严重的后果
        // 论文
        const papersBasicInfoReqs = publicationInfo.papers.map(id =>
          PapersAPI.getBasicInfoById(id)
        );
        setTimeout(async () => {
          const papersRes = await Promise.all(papersBasicInfoReqs);
          this.publicationInfo.papers = papersRes.map(res => res.data);
        }, 0);
      } catch (e) {
        console.log(e.toString());
      } finally {
        this.isLoading = false;
      }
    }
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
