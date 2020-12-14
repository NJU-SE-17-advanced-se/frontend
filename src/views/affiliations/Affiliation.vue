<template>
  <p>Affiliation: {{ id }}</p>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Affiliation",
  props: {
    id: String
  }
});
</script>

<style scoped></style>
