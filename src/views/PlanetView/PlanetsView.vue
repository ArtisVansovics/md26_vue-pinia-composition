<template>
  <h1>Planets</h1>
  <p v-if="isLoading">Loading...</p>
  <p v-if="error">{{ error.message }}</p>
  {{ planets }}
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { usePlanetStore } from "@/stores/planets";

export default defineComponent({
  name: "PlanetsView",
  setup() {
    const { isLoading, error, planetData } = storeToRefs(usePlanetStore());
    const { getPlanets } = usePlanetStore();

    const planets = computed(() => {
      return planetData.value.results;
    });

    getPlanets();

    return { isLoading, error, planets };
  },
});
</script>

<style scoped lang="scss" src="./PlanetView.scss" />
