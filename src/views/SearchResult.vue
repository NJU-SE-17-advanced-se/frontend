<template>
  <el-container @keyup.enter.native="doSearch" class="result-wrapper">
    <!--顶部工具栏-->
    <el-header class="result-header">
      <!--返回首页-->
      <el-button type="primary" @click="$router.push('/')">
        <i class="el-icon-back" /> 首页
      </el-button>
      <el-divider direction="vertical" />
      <!--搜索框-->
      <search-bar
        v-model="searchKeyword"
        :mode="searchMode"
        :options="searchModeOptions"
        @mode-change="updateSearchMode"
        @search="doSearch"
      />
    </el-header>
    <el-main>
      <!--展示搜索结果-->
      <!--此处绑定的是 props 中的属性，在每次 props 变更之后再更新-->
      <!--page 没有绑定 props，因为影响不大，每次变更页面也要变更，而且需要 number 类型-->
      <search-result-factory
        :mode="mode"
        :keyword="keyword"
        :page="currentPage"
        @total-change="updateTotalPages"
        class="result-content"
      />
      <!--分页，每页 10 条-->
      <el-pagination
        :current-page.sync="currentPage"
        :page-size="10"
        :total="total"
        layout="prev, pager, next"
        :small="isPaginationSmall"
        hide-on-single-page
        @current-change="doSearch"
        class="result-pagination"
      />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Container, Divider, Header, Main, Pagination } from "element-ui";
import SearchBar from "@/components/SearchBar.vue";
import SearchResultFactory from "@/components/search-result/SearchResultFactory";
import { isMobile } from "@/utils/breakpoint";
import { SearchModes } from "@/interfaces/search";

export default Vue.extend({
  name: "SearchResult",
  props: {
    mode: String,
    keyword: String,
    page: String
  },
  components: {
    [Container.name]: Container,
    [Divider.name]: Divider,
    [Header.name]: Header,
    [Main.name]: Main,
    [Pagination.name]: Pagination,
    SearchBar,
    SearchResultFactory
  },
  data() {
    return {
      // 搜索模式
      searchMode: this.mode as SearchModes,
      searchModeOptions: [
        { label: "论文", value: "papers" },
        { label: "学者", value: "researchers" },
        { label: "领域", value: "domains" },
        { label: "机构", value: "affiliations" },
        { label: "出版物", value: "publications" }
      ],
      // 搜索关键词
      searchKeyword: this.keyword,
      // 搜索结果
      currentPage: Number(this.page),
      total: 0,
      // 视图控制
      // 分页大小
      isPaginationSmall: isMobile()
    };
  },
  methods: {
    // 用于页面展示和页面数据更新
    updateSearchMode(mode: SearchModes) {
      this.searchMode = mode;
    },
    updateTotalPages(pages: number) {
      this.total = pages;
    },
    // 触发搜索事件，修改 URL
    doSearch() {
      if (!this.searchKeyword) {
        this.$message.warning("请输入搜索内容");
        return;
      }
      this.$router.push({
        path: `/result/${this.searchMode}`,
        query: {
          keyword: this.searchKeyword,
          page: this.currentPage.toString()
        }
      });
    }
  }
});
</script>

<style scoped lang="less">
.result-wrapper {
  height: 100%;
  display: flex;

  .result-header {
    flex: 0 1 60px;
    display: flex;
    align-items: center;
    padding: 10px;

    border-bottom: 10px black;
  }

  .result-content {
    flex: 1;
  }

  .result-pagination {
    text-align: center;
    flex: 0 1 60px;
  }
}
</style>
