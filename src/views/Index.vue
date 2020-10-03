<template>
  <div class="homepage-header">
    <h1 class="homepage-header__title">
      OASIS
    </h1>
    <p class="homepage-header__intro">
      Provide Comprehensive Search and Mining Services for Researcher Social
      Networks
    </p>
    <el-input
      :placeholder="searchPlaceholder"
      v-model="keyword"
      class="homepage-header__input"
    >
      <template #prepend>
        <el-select v-model="mode" placeholder="请选择" style="min-width: 100px">
          <el-option label="学者" value="researcher"></el-option>
          <el-option label="论文" value="paper"></el-option>
        </el-select>
      </template>
      <template #append>
        <el-button icon="el-icon-search" @click="doSearch"></el-button>
      </template>
    </el-input>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Input, Option, Select } from "element-ui";

export default Vue.extend({
  name: "Index",
  components: {
    [Input.name]: Input,
    [Option.name]: Option,
    [Select.name]: Select
  },
  data() {
    return {
      mode: "researcher",
      keyword: ""
    };
  },
  computed: {
    searchPlaceholder(): string {
      return this.mode === "researcher"
        ? "请输入学者相关信息，如姓名、机构……"
        : "请输入论文相关信息，如标题、摘要、作者……";
    }
  },
  methods: {
    doSearch() {
      console.log(this.mode, this.keyword);
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
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  background: url(../assets/background.jpg) no-repeat;
  background-size: 100%;
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
  }

  .homepage-header__input {
    .pc-width__mobile(45vw);
    .mobile-width(100%);
  }
}
</style>
