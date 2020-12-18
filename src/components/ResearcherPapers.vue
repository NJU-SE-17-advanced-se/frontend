<template>
  <p>全部论文：{{ id }}</p>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ResearcherPapers",
  props: {
    id: String
  }
});
</script>

<style scoped></style>
