<template>
  <p>Relation: {{ id }}</p>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Relation",
  props: {
    id: String
  }
});
</script>

<style scoped></style>
