<template>
  <h1>Films</h1>
  <p v-if="isLoading">Loading...</p>
  <p v-if="error">{{ error.message }}</p>
  <div v-if="films" class="grid">
    <FilmCard
      v-for="{
        title,
        episode_id,
        director,
        producer,
        release_date,
        opening_crawl,
      } in films"
      :key="episode_id"
    >
      {{ title }}
      <template #episodeId>{{ episode_id }}</template>
      <template #director>{{ director }}</template>
      <template #producer>{{ producer }}</template>
      <template #releaseDate>{{ release_date }}</template>
      <template #openingCrawl>{{ opening_crawl }}</template>
    </FilmCard>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useFilmStore } from "@/stores/films";
import { storeToRefs } from "pinia";
import FilmCard from "@/components/FilmCard/FilmCard.vue";

export default defineComponent({
  name: "FilmsView",
  components: { FilmCard },
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

<style scoped lang="scss" src="./FilmsView.scss" />
