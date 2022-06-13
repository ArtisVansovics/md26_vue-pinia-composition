<template>
  <h1>Films</h1>
  <select v-model="sortValue">
    <option disabled value="">Sort films by:</option>
    <option
      v-for="{ id, name, value } in filmSortOptions"
      :key="id"
      :value="value"
    >
      {{ name }}
    </option>
  </select>
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
import { computed, defineComponent, ref } from "vue";
import { useFilmStore } from "@/stores/films";
import { storeToRefs } from "pinia";
import FilmCard from "@/components/FilmCard/FilmCard.vue";

type FilmOptions = {
  id: number;
  name: string;
  value: string;
};

export default defineComponent({
  name: "FilmsView",
  components: { FilmCard },
  data: () => ({
    filmSortOptions: [
      {
        id: 1,
        name: "Sort Ascending By Id",
        value: "filmsByIdAscending",
      },
      {
        id: 2,
        name: "Sort Descending By Id",
        value: "filmsByIdDescending",
      },
      {
        id: 3,
        name: "Sort Ascending By Release Date",
        value: "filmsByDateAscending",
      },
      {
        id: 4,
        name: "Sort Descending By Release Date",
        value: "filmsByDateDescending",
      },
    ] as FilmOptions[],
  }),
  setup() {
    const { isLoading, error, filmData } = storeToRefs(useFilmStore());
    const { getFilms } = useFilmStore();
    const sortValue = ref("filmsByIdAscending");

    const films = computed(() => {
      let filmsSorted = filmData.value.results;

      if (sortValue.value === "filmsByIdAscending") {
        filmsSorted = filmsSorted.sort(
          (filmA, filmB) => filmA.episode_id - filmB.episode_id
        );
      } else if (sortValue.value === "filmsByIdDescending") {
        filmsSorted = filmsSorted.sort(
          (filmA, filmB) => filmB.episode_id - filmA.episode_id
        );
      } else if (sortValue.value === "filmsByDateAscending") {
        filmsSorted = filmsSorted.sort(
          (filmA, filmB) =>
            Date.parse(filmA.release_date) - Date.parse(filmB.release_date)
        );
      } else if (sortValue.value === "filmsByDateDescending") {
        filmsSorted = filmsSorted.sort(
          (filmA, filmB) =>
            Date.parse(filmB.release_date) - Date.parse(filmA.release_date)
        );
      }

      return filmsSorted;
    });

    getFilms();

    return { isLoading, error, films, sortValue };
  },
});
</script>

<style scoped lang="scss" src="./FilmsView.scss" />
