<template>
  <!--回车也能触发搜索-->
  <div class="homepage-header" @keydown.enter="doSearch">
    <h1 class="homepage-header__title">
      OASIS+
    </h1>
    <p class="homepage-header__intro">
      Mining Scholar Data
    </p>
    <el-input
      v-model="searchKeyword"
      :placeholder="searchPlaceholder"
      class="homepage-header__input"
    >
      <template #prepend>
        <el-select
          v-model="searchMode"
          placeholder="请选择"
          style="min-width: 100px"
        >
          <el-option
            v-for="modeOption of searchModeOptions"
            :label="modeOption.label"
            :value="modeOption.value"
            :key="modeOption.label"
          />
        </el-select>
      </template>
      <template #append>
        <el-button icon="el-icon-search" @click="doSearch" />
      </template>
    </el-input>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Input, Option, Select } from "element-ui";

// 现有的搜索类型
type SearchModes =
  | "paper"
  | "researcher"
  | "domain"
  | "affiliation"
  | "publication";

export default Vue.extend({
  name: "Index",
  components: {
    [Input.name]: Input,
    [Option.name]: Option,
    [Select.name]: Select
  },
  data() {
    return {
      // 搜索模式
      searchMode: "paper" as SearchModes,
      searchModeOptions: [
        { label: "论文", value: "paper" },
        { label: "学者", value: "researcher" },
        { label: "领域", value: "domain" },
        { label: "机构", value: "affiliation" },
        { label: "出版物", value: "publication" }
      ],
      // 搜索关键词
      searchKeyword: "" as string
    };
  },
  computed: {
    searchPlaceholder(): string {
      const placeholders = {
        paper: "请输入论文相关信息，如标题、摘要、作者",
        researcher: "请输入学者相关信息，如姓名、机构",
        domain: "请输入研究领域相关信息，如名称",
        affiliation: "请输入机构相关信息，如名称",
        publication: "请输入出版物相关信息，如名称"
      };
      return placeholders[this.searchMode];
    }
  },
  methods: {
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

  .homepage-header__input {
    .pc-width__mobile(45vw);
    .mobile-width(100%);
  }
}
</style>
