<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-date-picker v-model="value1" type="date" placeholder="选择日期" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { DatePicker } from "element-ui";

export default Vue.extend({
  name: "About",
  components: {
    [DatePicker.name]: DatePicker
  },
  data() {
    return {
      value1: ""
    };
  }
});
</script>
