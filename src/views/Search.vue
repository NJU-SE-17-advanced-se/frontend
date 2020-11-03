<template>
  <!--回车也能触发搜索-->
  <div class="homepage-header" @keydown.enter="doSearch">
    <h1 class="homepage-header__title">
      OASIS+
    </h1>
    <p class="homepage-header__intro">
      Mining Scholar Data
    </p>
    <!--搜索框-->
    <search-bar
      v-model="searchKeyword"
      :mode="searchMode"
      :options="searchModeOptions"
      @mode-change="updateSearchMode"
      @search="doSearch"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SearchBar from "@/components/SearchBar.vue";
import { SearchModes } from "@/interfaces/search";

export default Vue.extend({
  name: "Search",
  components: { SearchBar },
  data() {
    return {
      // 搜索模式
      searchMode: "papers" as SearchModes,
      searchModeOptions: [
        { label: "论文", value: "papers" },
        { label: "学者", value: "researchers" },
        { label: "领域", value: "domains" },
        { label: "机构", value: "affiliations" },
        { label: "出版物", value: "publications" }
      ],
      // 搜索关键词
      searchKeyword: "" as string
    };
  },
  methods: {
    updateSearchMode(mode: SearchModes) {
      this.searchMode = mode;
    },
    doSearch() {
      if (!this.searchKeyword) {
        this.$message.warning("请输入搜索内容");
        return;
      }
      this.$router.push({
        path: `/result/${this.searchMode}`,
        query: {
          keyword: this.searchKeyword,
          page: "1"
        }
      });
    }
  }
});
</script>

<style scoped lang="less">
@import "../assets/responsive";

h1 {
  margin: 0;
}

.homepage-header {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  .pc-padding__pad(0 150px);
  .pad-padding(0 30px);

  .homepage-header__title {
    font-size: 5.5rem;
    letter-spacing: 10px;
  }

  .homepage-header__intro {
    .pc-width__mobile(45vw);
    .mobile-width(100%);
    font-size: 1.4rem;
    margin-top: 25px;
    text-align: center;
  }
}
</style>
