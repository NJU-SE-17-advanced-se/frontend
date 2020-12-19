<template>
  <div class="wrapper" v-loading="isLoading">
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
    <template v-if="papersBasicInfo.length > 0">
      <el-card
        v-for="(paper, i) of papersBasicInfo"
        :key="i"
        class="result-card"
      >
        <template #header>
          <router-link :to="`/papers/${paper.id}`">
            <strong>{{ paper.title }}</strong>
          </router-link>
        </template>
        <p>
          <strong>Publication:</strong>
          {{ paper.publication }}, {{ paper.publicationDate }}
        </p>
        <!--学者-->
        <p>
          <strong>Authors:</strong>
          <span v-if="paper.researchers.length === 0"> 暂无数据</span>
        </p>
        <ul>
          <li
            v-for="(researcher, i) of paper.researchers"
            :key="paper.id + 'r' + i"
          >
            {{ researcher }}
          </li>
        </ul>
        <p><strong>Abstract:</strong> {{ getLimitedLengthAbs(paper.abs) }}</p>
        <p><strong>Citation:</strong> {{ paper.citations }}</p>
        <el-button
          type="primary"
          class="result-button"
          @click="$router.push(`/papers/${paper.id}`)"
        >
          详情 <i class="el-icon-right" />
        </el-button>
      </el-card>
    </template>
    <p v-else style="text-align: center; line-height: 70vh">暂无结果……</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Card, DatePicker } from "element-ui";
import { PaperBasic } from "@/interfaces/papers";
import { errorMsg } from "@/utils/message";
import PaperAPI from "@/api/papers";
import PublicationAPI from "@/api/publications";
import ResearcherAPI from "@/api/researchers";

export default Vue.extend({
  name: "SearchResultPapers",
  props: {
    keyword: String,
    page: Number
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
      papersBasicInfo: [] as PaperBasic[]
    };
  },
  watch: {
    keyword() {
      this.fetchSearchResult(
        this.keyword,
        this.page,
        this.startDate,
        this.endDate
      );
    },
    page() {
      this.fetchSearchResult(
        this.keyword,
        this.page,
        this.startDate,
        this.endDate
      );
    },
    startDate() {
      this.fetchSearchResult(
        this.keyword,
        this.page,
        this.startDate,
        this.endDate
      );
    },
    endDate() {
      this.fetchSearchResult(
        this.keyword,
        this.page,
        this.startDate,
        this.endDate
      );
    }
  },
  mounted() {
    this.fetchSearchResult(
      this.keyword,
      this.page,
      this.startDate,
      this.endDate
    );
  },
  methods: {
    // 获取搜索结果
    async fetchSearchResult(
      keyword: string,
      page: number,
      start?: string,
      end?: string
    ) {
      if (!start) {
        errorMsg("请选择开始年份");
      } else if (!end) {
        errorMsg("请选择结束年份");
      } else if (new Date(start) > new Date(end)) {
        errorMsg("开始年份不能在结束年份之后");
      } else {
        console.log("fetching", "papers", keyword, page, start, end);
        this.isLoading = true;
        try {
          const paperSearchRes = await PaperAPI.search(
            keyword,
            page,
            start,
            end
          );
          const paperIds = paperSearchRes.data.ids;
          // 每一页数量必然在 0 - 10（约定）
          const papersBasicInfoReqs = paperIds.map(id =>
            PaperAPI.getBasicInfoById(id)
          );
          // HTTP/1.1 浏览器最大连接数大致为 4 - 6，取最小值
          const reqBatch1 = Promise.all(papersBasicInfoReqs.slice(0, 4));
          const reqBatch2 = Promise.all(papersBasicInfoReqs.slice(4, 7));
          const reqBatch3 = Promise.all(papersBasicInfoReqs.slice(7, 10));
          const res1 = await reqBatch1;
          const res2 = await reqBatch2;
          const res3 = await reqBatch3;
          this.papersBasicInfo = [
            ...res1.map(res => res.data),
            ...res2.map(res => res.data),
            ...res3.map(res => res.data)
          ];
          // 为了在 JSX 中解析，此处事件名称必须为 camelCase
          // 并且我不想引入一个新的库
          this.$emit("totalChange", paperSearchRes.data.count);
          // 根据 id 更新论文其他信息
          this.papersBasicInfo.forEach(paper => {
            setTimeout(async () => {
              paper = await this.fetchPaperBasicMoreDetailInfo(paper);
            }, 0);
          });
        } catch (e) {
          console.log(e.toString());
        } finally {
          this.isLoading = false;
        }
      }
    },
    async fetchPaperBasicMoreDetailInfo(paper: PaperBasic) {
      try {
        // publication 存在时处理
        if (paper.publication) {
          const publicationReq = PublicationAPI.getBasicInfoById(
            paper.publication
          );
          const researcherReqs = paper.researchers.map(id =>
            ResearcherAPI.getBasicInfoById(id)
          );
          const researcherReq = Promise.all(researcherReqs);
          const publicationRes = await publicationReq;
          const researcherRes = await researcherReq;
          paper.publication = publicationRes.data.name;
          paper.researchers = researcherRes.map(
            researcher => researcher.data.name
          );
        }
      } catch (e) {
        console.log(e.toString());
      }
      return paper;
    },
    getLimitedLengthAbs(abs: string) {
      // 截取前500个字符，相当于前100词左右
      // 据某统计数据表示，平均单词长度为4-5个字母
      const LIMIT = 500;
      return abs && abs.length > LIMIT ? abs.substr(0, LIMIT) + "..." : abs;
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
