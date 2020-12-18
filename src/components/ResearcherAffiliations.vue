<template>
  <p>历史机构：{{ id }}</p>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ResearcherAffiliations",
  props: {
    id: String
  }
});
</script>

<style scoped></style>
