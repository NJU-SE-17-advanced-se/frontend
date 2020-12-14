<template>
  <p>Domain: {{ id }}</p>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Domain",
  props: {
    id: String
  }
});
</script>

<style scoped></style>
