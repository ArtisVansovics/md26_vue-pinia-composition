<template>
  <p v-if="isLoading">Loading...</p>
  <p v-if="error">{{ error.message }}</p>
  <h1 class="title">{{ planetData.name }}</h1>
  <custom-button>View image</custom-button>
  <p class="text">Population: {{ planetData.population }}</p>
  <div class="grid">
    <div class="column">
      <h3>Planetary data</h3>
      <p class="column__text">
        Rotation period: {{ planetData.rotation_period }} hours
      </p>
      <p class="column__text">
        Orbital period: {{ planetData.orbital_period }} standard days
      </p>
      <p class="column__text">Diameter: {{ planetData.diameter }} m</p>
    </div>
    <div class="column">
      <h3>Environmental data</h3>
      <p class="column__text">Climate conditions: {{ planetData.climate }}</p>
      <p class="column__text">Terrain type: {{ planetData.terrain }}</p>
      <p class="column__text">
        Amount of surface water: {{ planetData.surface_water }}%
      </p>
    </div>
  </div>
  <h2>Known residents</h2>
  <div class="grid small-gap">
    <a
      v-for="url in planetData.residents"
      :href="url"
      v-bind:key="url"
      class="link"
    >
      {{ url }}
    </a>
  </div>
  <h2>Films {{ planetData.name }} appears in</h2>
  <div class="grid small-gap">
    <a
      v-for="url in planetData.films"
      :href="url"
      v-bind:key="url"
      class="link"
    >
      {{ url }}
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { usePlanetStore } from "@/stores/planet";
import { useRoute } from "vue-router";
import CustomButton from "@/components/CustomButton/CustomButton.vue";

export default defineComponent({
  name: "PlanetView",
  components: { CustomButton },
  setup() {
    const { isLoading, error, planetData } = storeToRefs(usePlanetStore());
    const { getPlanet } = usePlanetStore();
    const route = useRoute();

    onMounted(() => {
      const id = Number(route.params.id);

      getPlanet(id);
    });

    return { isLoading, error, planetData };
  },
});
</script>

<style scoped lang="scss" src="./PlanetView.scss" />
