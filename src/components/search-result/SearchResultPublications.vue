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
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Card, DatePicker } from "element-ui";
import { PublicationBasic } from "@/interfaces/publications";

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
    fetchSearchResult(
      keyword: string,
      page: number,
      start?: string,
      end?: string
    ) {
      if (!start) {
        this.$message.error("请选择开始年份");
      } else if (!end) {
        this.$message.error("请选择结束年份");
      } else if (new Date(start) > new Date(end)) {
        this.$message.error("开始年份不能在结束年份之后");
      } else {
        console.log("fetching", "publications", keyword, page);
        this.isLoading = true;
        setTimeout(() => {
          this.publicationsBasicInfo = [
            {
              id: "32_7004098",
              name: "IEEE Transactions on Software Engineering",
              publicationDate: "2015"
            },
            {
              id: "32_7004098",
              name: "IEEE Transactions on Software Engineering",
              publicationDate: "2015"
            },
            {
              id: "32_7004098",
              name: "IEEE Transactions on Software Engineering",
              publicationDate: "2015"
            },
            {
              id: "32_7004098",
              name: "IEEE Transactions on Software Engineering",
              publicationDate: "2015"
            },
            {
              id: "32_7004098",
              name: "IEEE Transactions on Software Engineering",
              publicationDate: "2015"
            }
          ];
          // 为了在 JSX 中解析，此处事件名称必须为 camelCase
          // 并且我不想引入一个新的库
          this.$emit("totalChange", 50);
          this.isLoading = false;
        }, 500);
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
