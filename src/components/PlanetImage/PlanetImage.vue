<template>
  <div class="planet" :style="style" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "PlanetImage",
  props: ["diameter", "water", "terrain", "population"],
  computed: {
    diameterCalculated() {
      return Number(this.diameter) * 0.01;
    },
    terrainColor() {
      let color = "";

      this.terrain === "desert"
        ? (color = "#F29F05")
        : this.terrain === "ocean"
        ? (color = "#0367A6")
        : null;

      return color;
    },
    style() {
      return (
        `width: ${this.diameterCalculated}px;` +
        `height: ${this.diameterCalculated}px;` +
        `border-width: ${this.water}px;` +
        `background-color: ${this.terrainColor};`
      );
    },
  },
});
</script>

<style scoped lang="scss" src="./PlanetImage.scss" />
