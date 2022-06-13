import { defineStore } from "pinia";
import axios from "axios";
import type { FilmData } from "@/models/FilmModel";

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
        this.filmData = await axios
          .get<FilmData>("https://swapi.dev/api/films")
          .then((response) => response.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
