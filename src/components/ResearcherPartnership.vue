<template>
  <p>合作关系：{{ id }}</p>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ResearcherPartnership",
  props: {
    id: String
  }
});
</script>

<style scoped></style>
