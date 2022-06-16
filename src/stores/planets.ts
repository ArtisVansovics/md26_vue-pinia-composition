import { defineStore } from "pinia";
import type { PlanetData } from "@/models/PlanetsModel";
import { swapiAxios } from "@/stores/people";

interface PlanetState {
  planetData: PlanetData;
  isLoading: boolean;
  error: null | any;
}

export const usePlanetStore = defineStore({
  id: "planets",
  state: (): PlanetState => ({
    planetData: {} as PlanetData,
    isLoading: false,
    error: null,
  }),
  getters: {},
  actions: {
    async getPlanets() {
      this.planetData = {} as PlanetData;
      this.isLoading = true;

      try {
        this.planetData = await swapiAxios
          .get<PlanetData>("planets")
          .then((response) => response.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
