import { defineStore } from "pinia";
import type { FilmData } from "@/models/FilmModel";
import { swapiAxios } from "@/stores/people";

interface FilmState {
  filmData: FilmData;
  isLoading: boolean;
  error: null | any;
}

export const useFilmStore = defineStore({
  id: "films",
  state: (): FilmState => ({
    filmData: {} as FilmData,
    isLoading: false,
    error: null,
  }),
  getters: {},
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
  },
});
