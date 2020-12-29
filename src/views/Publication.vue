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
        <ol
          v-infinite-scroll="loadPapers"
          :infinite-scroll-disabled="isPapersScrollDisabled"
          :infinite-scroll-immediate="false"
          style="max-height: 300px; overflow: auto"
        >
          <li v-for="(paper, i) of publicationInfo.papers" :key="i">
            <router-link :to="`/papers/${paper.id}`">
              {{ paper.title }}
            </router-link>
          </li>
          <li v-if="isPaperLoading" style="margin-top: 10px" class="loading" />
          <li
            v-if="showNoMorePapers && noMorePapers"
            style="color: #ccc; list-style: none"
          >
            没有更多了
          </li>
        </ol>
      </el-card>
    </el-main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { PublicationDisplay } from "@/interfaces/publications";
import { Card, Header, InfiniteScroll, Main } from "element-ui";
import PapersAPI from "@/api/papers";
import PublicationsAPI from "@/api/publications";

const PAPER_BATCH_SIZE = 10;

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
  directives: {
    InfiniteScroll
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
      } as PublicationDisplay,
      // 论文
      papersIds: [] as string[],
      papersBatch: 0,
      isPaperLoading: false
    };
  },
  computed: {
    showNoMorePapers(): boolean {
      return this.papersIds.length > PAPER_BATCH_SIZE;
    },
    noMorePapers(): boolean {
      return (
        this.papersBatch >= Math.ceil(this.papersIds.length / PAPER_BATCH_SIZE)
      );
    },
    isPapersScrollDisabled(): boolean {
      return this.isPaperLoading || this.noMorePapers;
    }
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
        // 设置 id，准备加载
        this.papersIds = publicationInfo.papers;
        setTimeout(() => {
          this.fetchPapers();
        }, 0);
      } catch (e) {
        console.log(e.toString());
      } finally {
        this.isLoading = false;
      }
    },
    // 论文
    loadPapers() {
      // 等到 id 全部加载完之后再加载
      if (this.isLoading) {
        return;
      }
      this.fetchPapers();
    },
    async fetchPapers() {
      this.isPaperLoading = true;
      const ids = this.papersIds.slice(
        this.papersBatch * PAPER_BATCH_SIZE,
        (this.papersBatch + 1) * PAPER_BATCH_SIZE
      );
      console.log("paper batch:", this.papersBatch);
      const papersBasicInfoReqs = ids.map(id => PapersAPI.getBasicInfoById(id));
      const papersRes = await Promise.all(papersBasicInfoReqs);
      // 加入现有的列表中，处理下一批
      this.publicationInfo.papers.push(...papersRes.map(res => res.data));
      this.isPaperLoading = false;
      this.papersBatch += 1;
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

  .loading {
    display: inline-block;
    width: 10px;
    height: 10px;
    border: 2px solid #409eff;
    border-left: transparent;
    animation: rotate 0.5s linear infinite;
    border-radius: 50%;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
