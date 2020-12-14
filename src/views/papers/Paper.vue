<template>
  <p>Paper: {{ id }}</p>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Paper",
  props: {
    id: String
  }
});
</script>

<style scoped></style>
