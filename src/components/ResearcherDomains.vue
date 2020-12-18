<template>
  <p>历史领域：{{ id }}</p>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ResearcherDomains",
  props: {
    id: String
  }
});
</script>

<style scoped></style>
