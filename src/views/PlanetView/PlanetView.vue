<template>
  <p v-if="isLoading">Loading...</p>
  <p v-if="error">{{ error.message }}</p>
  <h1>{{ planetData.name }}</h1>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { usePlanetStore } from "@/stores/planet";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "PlanetView",
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
