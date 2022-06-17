import { defineStore } from "pinia";
import type { PlanetsData } from "@/models/PlanetsModel";
import { swapiAxios } from "@/stores/people";

interface PlanetsState {
  planetsData: PlanetsData;
  isLoading: boolean;
  error: null | any;
}

export const usePlanetsStore = defineStore({
  id: "planets",
  state: (): PlanetsState => ({
    planetsData: {} as PlanetsData,
    isLoading: false,
    error: null,
  }),
  getters: {},
  actions: {
    async getPlanets() {
      this.planetsData = {} as PlanetsData;
      this.isLoading = true;

      try {
        this.planetsData = await swapiAxios
          .get<PlanetsData>("planets")
          .then((response) => response.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
