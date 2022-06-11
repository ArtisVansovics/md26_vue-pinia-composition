<template>
  <h1>Planet: {{ $route.params.id }}</h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PlanetView",
});
</script>

<style scoped lang="scss" />
