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
        : this.planetTerrain === "ocean" ||
          this.planetTerrain === "oceans" ||
          this.planetTerrain === "lakes"
        ? (color = "#0367A6")
        : this.planetTerrain === "grasslands" ||
          this.planetTerrain === "grassy hills" ||
          this.planetTerrain === "plains"
        ? (color = "#BFA617")
        : this.planetTerrain === "jungle" ||
          this.planetTerrain === "jungles" ||
          this.planetTerrain === "rainforests"
        ? (color = "#569638")
        : this.planetTerrain === "swamp" || this.planetTerrain === "swamps"
        ? (color = "#8C7C3B")
        : this.planetTerrain === "gas giant"
        ? (color = "#DB6707")
        : this.planetTerrain === "forests"
        ? (color = "#2ABF5B")
        : this.planetTerrain === "cityscape" || this.planetTerrain === "urban"
        ? (color = "#B3AFA8")
        : this.planetTerrain === "rock" ||
          this.planetTerrain === "rocky islands"
        ? (color = "#734502")
        : this.planetTerrain === "scrublands"
        ? (color = "#D9C471")
        : this.planetTerrain === "volcanoes"
        ? (color = "#59110B")
        : this.planetTerrain === "glaciers" ||
          this.planetTerrain === "mountains" ||
          this.planetTerrain === "tundra"
        ? (color = "#A1BEBF")
        : this.planetTerrain === "fungus forests"
        ? (color = "#8E8BA6")
        : this.planetTerrain === "caves" || this.planetTerrain === "barren"
        ? (color = "#73706C")
        : this.planetTerrain === "toxic cloudsea"
        ? (color = "#5BF21D")
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
