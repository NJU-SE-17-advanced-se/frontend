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
    <template v-if="publicationsBasicInfo.length > 0">
      <el-card
        v-for="(publication, i) of publicationsBasicInfo"
        :key="i"
        class="result-card"
      >
        <template #header>
          <router-link :to="`/publications/${publication.id}`">
            <strong>{{ publication.name }}</strong>
          </router-link>
        </template>
        <p><strong>Publication:</strong> {{ publication.publicationDate }}</p>
        <el-button
          type="primary"
          class="result-button"
          @click="$router.push(`/publications/${publication.id}`)"
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
import { PublicationBasic } from "@/interfaces/publications";
import { errorMsg } from "@/utils/message";
import PublicationAPI from "@/api/publications";

export default Vue.extend({
  name: "SearchResultPublications",
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
      publicationsBasicInfo: [] as PublicationBasic[]
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
        console.log("fetching", "publications", keyword, page);
        this.isLoading = true;
        const publicationSearchRes = await PublicationAPI.search(
          keyword,
          page,
          start,
          end
        );
        const publicationIds = publicationSearchRes.data.result;
        // 每一页数量必然在 0 - 10（约定）
        const publicationsBasicInfoReqs = publicationIds.map(id =>
          PublicationAPI.getBasicInfoById(id)
        );
        // HTTP/1.1 浏览器最大连接数大致为 4 - 6，取最小值
        const reqBatch1 = Promise.all(publicationsBasicInfoReqs.slice(0, 4));
        const reqBatch2 = Promise.all(publicationsBasicInfoReqs.slice(4, 7));
        const reqBatch3 = Promise.all(publicationsBasicInfoReqs.slice(7, 10));
        const res1 = await reqBatch1;
        const res2 = await reqBatch2;
        const res3 = await reqBatch3;
        this.publicationsBasicInfo = [
          ...res1.map(res => res.data),
          ...res2.map(res => res.data),
          ...res3.map(res => res.data)
        ];
        // 为了在 JSX 中解析，此处事件名称必须为 camelCase
        // 并且我不想引入一个新的库
        this.$emit("totalChange", publicationSearchRes.data.count);
        this.isLoading = false;
      }
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
