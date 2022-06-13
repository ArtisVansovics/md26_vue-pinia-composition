import { defineStore } from "pinia";
import axios from "axios";
import type { PlanetData } from "@/models/PlanetsModel";

const swapiPlanets = axios.create({
  baseURL: "https://swapi.dev/api/planets",
});

interface PlanetState {
  planetData: PlanetData;
  isLoading: boolean;
  error: null | any;
}

export const usePlanetStore = defineStore({
  id: "people",
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
        this.planetData = await swapiPlanets
          .get<PlanetData>("")
          .then((response) => response.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
