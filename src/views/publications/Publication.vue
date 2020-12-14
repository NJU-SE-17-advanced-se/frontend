<template>
  <p>Publication: {{ id }}</p>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Publication",
  props: {
    id: String
  }
});
</script>

<style scoped></style>
