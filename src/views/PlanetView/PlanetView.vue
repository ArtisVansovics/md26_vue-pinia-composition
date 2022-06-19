<template>
  <p v-if="isLoading">Loading...</p>
  <p v-if="error" class="warning">{{ error.message }}</p>
  <template v-if="!isLoading && !error">
    <div class="row">
      <CustomButton @click="goToPrevious" :is-disabled="id <= 1">
        Previous planet
      </CustomButton>
      <h1 class="title">{{ planetData.name }}</h1>
      <CustomButton @click="goToNext" :is-disabled="id >= 60">
        Next planet
      </CustomButton>
    </div>
    <custom-button :onClick="toggleImage">View image</custom-button>
    <h3
      v-if="
        showImage &&
        (planetData.diameter < 1 || planetData.diameter === 'unknown')
      "
      class="warning"
    >
      No image available!
    </h3>
    <PlanetImage
      v-else-if="showImage"
      :diameter="planetData.diameter"
      :water="planetData.surface_water"
      :terrain="planetData.terrain"
      :population="planetData.population"
    />
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
    <h2>Films {{ planetData.name }} appears in</h2>
    <div class="column small-gap">
      <a
        v-for="url in planetData.films"
        :href="url"
        v-bind:key="url"
        class="link"
      >
        Episode {{ url.split("/").at(-2) }}
      </a>
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
  </template>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { usePlanetStore } from "@/stores/planet";
import { useRoute, useRouter } from "vue-router";
import CustomButton from "@/components/CustomButton/CustomButton.vue";
import PlanetImage from "@/components/PlanetImage/PlanetImage.vue";

export default defineComponent({
  name: "PlanetView",
  components: { PlanetImage, CustomButton },
  setup() {
    const { isLoading, error, planetData } = storeToRefs(usePlanetStore());
    const { getPlanet } = usePlanetStore();
    const route = useRoute();
    const router = useRouter();
    const showImage = ref(false);

    const id = computed(() => {
      return Number(route.params.id);
    });

    onMounted(() => {
      getPlanet(id.value);
    });

    function toggleImage() {
      showImage.value = !showImage.value;
    }

    function goToPrevious() {
      router.push(`/planets/${id.value - 1}`);
      getPlanet(id.value - 1);
      showImage.value = false;
    }

    function goToNext() {
      router.push(`/planets/${id.value + 1}`);
      getPlanet(id.value + 1);
      showImage.value = false;
    }

    return {
      isLoading,
      error,
      planetData,
      showImage,
      id,
      toggleImage,
      goToPrevious,
      goToNext,
    };
  },
});
</script>

<style scoped lang="scss" src="./PlanetView.scss" />
