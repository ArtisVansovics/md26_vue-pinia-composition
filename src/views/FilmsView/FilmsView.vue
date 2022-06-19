<template>
  <p v-if="isLoading">Loading...</p>
  <p v-if="error">{{ error.message }}</p>
  <template v-if="!isLoading && !error">
    <div class="row">
      <select v-model="sortValue" class="select">
        <option disabled value="">Sort films by:</option>
        <option
          v-for="{ id, name, value } in filmSortOptions"
          :key="id"
          :value="value"
        >
          {{ name }}
        </option>
      </select>
      <CustomButton @click="setSortValue(sortValue)">Sort</CustomButton>
    </div>
    <div v-if="sortedFilms" class="grid">
      <FilmCard
        v-for="{
          title,
          episode_id,
          director,
          producer,
          release_date,
          opening_crawl,
        } in sortedFilms"
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
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useFilmStore } from "@/stores/films";
import { storeToRefs } from "pinia";
import FilmCard from "@/components/FilmCard/FilmCard.vue";
import CustomButton from "@/components/CustomButton/CustomButton.vue";

type FilmOptions = {
  id: number;
  name: string;
  value: string;
};

export default defineComponent({
  name: "FilmsView",
  components: { CustomButton, FilmCard },
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
    const { isLoading, error, sortedFilms } = storeToRefs(useFilmStore());
    const { getFilms, setSortValue } = useFilmStore();
    const sortValue = ref("filmsByIdAscending");

    getFilms();

    return { isLoading, error, sortValue, setSortValue, sortedFilms };
  },
});
</script>

<style scoped lang="scss" src="./FilmsView.scss" />
