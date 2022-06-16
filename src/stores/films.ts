import { defineStore } from "pinia";
import type { FilmData } from "@/models/FilmModel";
import { swapiAxios } from "@/stores/people";

interface FilmState {
  filmData: FilmData;
  sortValue: string;
  isLoading: boolean;
  error: null | any;
}

export const useFilmStore = defineStore({
  id: "films",
  state: (): FilmState => ({
    filmData: {} as FilmData,
    sortValue: "filmsByIdAscending",
    isLoading: false,
    error: null,
  }),
  getters: {
    sortedFilms(state) {
      let films = state.filmData.results;

      if (this.sortValue === "filmsByIdAscending") {
        films = films?.sort(
          (filmA, filmB) => filmA.episode_id - filmB.episode_id
        );
      } else if (this.sortValue === "filmsByIdDescending") {
        films = films.sort(
          (filmA, filmB) => filmB.episode_id - filmA.episode_id
        );
      } else if (this.sortValue === "filmsByDateAscending") {
        films = films.sort(
          (filmA, filmB) =>
            Date.parse(filmA.release_date) - Date.parse(filmB.release_date)
        );
      } else if (this.sortValue === "filmsByDateDescending") {
        films = films.sort(
          (filmA, filmB) =>
            Date.parse(filmB.release_date) - Date.parse(filmA.release_date)
        );
      }

      return films;
    },
  },
  actions: {
    async getFilms() {
      this.filmData = {} as FilmData;
      this.isLoading = true;

      try {
        this.filmData = await swapiAxios
          .get<FilmData>("films")
          .then((response) => response.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    },
    setSortValue(value: string) {
      this.sortValue = value;
    },
  },
});
