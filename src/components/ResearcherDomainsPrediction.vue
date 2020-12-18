<template>
  <p>领域预测：{{ id }}</p>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ResearcherDomainsPrediction",
  props: {
    id: String
  }
});
</script>

<style scoped></style>
