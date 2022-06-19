<template>
  <p v-if="isLoading">Loading...</p>
  <p v-if="error">{{ error.message }}</p>
  <template v-if="!isLoading && !error">
    <div v-if="planets" class="grid">
      <PlanetCard
        v-for="{ name, climate, terrain, population, url } in planets"
        :key="name"
      >
        {{ name }}
        <template #climate>{{ climate }}</template>
        <template #terrain>{{ terrain }}</template>
        <template #population>{{ population }}</template>
        <template #button>
          <CustomButton @click="$router.push(`/planets/${getId(url)}`)">
            Go to planet
          </CustomButton>
        </template>
      </PlanetCard>
    </div>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { usePlanetsStore } from "@/stores/planets";
import PlanetCard from "@/components/PlanetCard/PlanetCard.vue";
import CustomButton from "@/components/CustomButton/CustomButton.vue";

export default defineComponent({
  name: "PlanetsView",
  components: { CustomButton, PlanetCard },
  setup() {
    const { isLoading, error, planetsData } = storeToRefs(usePlanetsStore());
    const { getPlanets } = usePlanetsStore();

    const planets = computed(() => {
      return planetsData.value.results;
    });

    function getId(url: string) {
      return url.split("/")[url.split("/").length - 2];
    }

    getPlanets();

    return { isLoading, error, planets, getId };
  },
});
</script>

<style scoped lang="scss" src="./PlanetsView.scss" />
