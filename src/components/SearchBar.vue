<template>
  <!--搜索框-->
  <el-input
    v-model="searchKeyword"
    :placeholder="searchPlaceholder"
    @input="onKeywordChange"
    style="vertical-align: center"
  >
    <template #prepend>
      <el-select
        v-model="searchMode"
        placeholder="请选择"
        style="min-width: 100px"
        @change="onModeChange"
      >
        <el-option
          v-for="modeOption of options"
          :label="modeOption.label"
          :value="modeOption.value"
          :key="modeOption.label"
        />
      </el-select>
    </template>
    <template #append>
      <el-button icon="el-icon-search" @click="onSearchTriggered" />
    </template>
  </el-input>
</template>

<script lang="ts">
import Vue from "vue";
import { Input, Option, Select } from "element-ui";
import { SearchModes } from "@/interfaces/search";

export default Vue.extend({
  name: "SearchBar",
  components: {
    [Input.name]: Input,
    [Option.name]: Option,
    [Select.name]: Select
  },
  model: {
    prop: "keyword",
    event: "input"
  },
  props: {
    keyword: String,
    mode: String,
    options: Array
  },
  data() {
    return {
      searchKeyword: this.keyword,
      searchMode: this.mode
    };
  },
  computed: {
    searchPlaceholder(): string {
      const placeholders = {
        papers: "请输入论文相关信息，如标题、摘要、作者",
        researchers: "请输入学者相关信息，如姓名、机构",
        domains: "请输入研究领域相关信息，如名称",
        affiliations: "请输入机构相关信息，如名称",
        publications: "请输入出版物相关信息，如名称"
      };
      return placeholders[this.mode as SearchModes];
    }
  },
  methods: {
    onKeywordChange() {
      this.$emit("input", this.searchKeyword);
    },
    onModeChange() {
      this.$emit("mode-change", this.searchMode);
    },
    onSearchTriggered() {
      this.$emit("search");
    }
  }
});
</script>

<style scoped></style>
