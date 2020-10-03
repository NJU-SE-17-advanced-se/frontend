<template>
  <p>Profile: {{ id }}</p>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Profile",
  props: {
    id: String
  }
});
</script>

<style scoped></style>
