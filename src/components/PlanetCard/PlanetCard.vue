<template>
  <div class="card">
    <h2 class="name"><slot></slot></h2>
    <p>Climate: <slot name="climate"></slot></p>
    <p>Terrain: <slot name="terrain"></slot></p>
    <p>Population: <slot name="population"></slot></p>
    <slot name="button"></slot>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PlanetCard",
});
</script>

<style scoped lang="scss" src="./PlanetCard.scss" />
