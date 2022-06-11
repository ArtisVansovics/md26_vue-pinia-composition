<template>
  <nav class="nav">
    <slot></slot>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavigationBar",
});
</script>

<style scoped lang="scss" src="./NavigationBar.scss" />
