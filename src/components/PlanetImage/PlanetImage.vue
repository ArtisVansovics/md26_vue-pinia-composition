<template>
  <div class="planet" :style="style" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "PlanetImage",
  props: ["diameter", "water", "terrain", "population"],
  computed: {
    planetDiameter() {
      return Number(this.diameter) * 0.01;
    },

    waterCoverage() {
      return Number(this.water) * 0.3;
    },

    planetTerrain() {
      return this.terrain.split(",")[0];
    },

    terrainColor() {
      let color = "";

      this.planetTerrain === "desert"
        ? (color = "#F29F05")
        : this.planetTerrain === "ocean"
        ? (color = "#0367A6")
        : null;

      return color;
    },
    style() {
      return (
        `width: ${this.planetDiameter}px;` +
        `height: ${this.planetDiameter}px;` +
        `border-width: ${this.waterCoverage}px;` +
        `background-color: ${this.terrainColor};`
      );
    },
  },
});
</script>

<style scoped lang="scss" src="./PlanetImage.scss" />
