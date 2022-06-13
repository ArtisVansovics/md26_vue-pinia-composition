<template>
  <h1>Films</h1>
  <p v-if="isLoading">Loading...</p>
  <p v-if="error">{{ error.message }}</p>
  {{ films }}
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useFilmStore } from "@/stores/films";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "FilmsView",
  setup() {
    const { filmData, isLoading, error } = storeToRefs(useFilmStore());
    const { getFilms } = useFilmStore();

    const films = computed(() => {
      return filmData.value.results;
    });

    getFilms();

    return { isLoading, error, films };
  },
});
</script>

<style scoped lang="scss" />
