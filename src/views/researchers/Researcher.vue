<template>
  <p>Researcher: {{ id }}</p>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Researcher",
  props: {
    id: String
  }
});
</script>

<style scoped></style>
