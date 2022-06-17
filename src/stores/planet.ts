import { defineStore } from "pinia";
import type { Planet } from "@/models/PlanetsModel";
import { swapiAxios } from "@/stores/people";

interface PlanetState {
  planetData: Planet;
  isLoading: boolean;
  error: null | any;
}

export const usePlanetStore = defineStore({
  id: "planet",
  state: (): PlanetState => ({
    planetData: {} as Planet,
    isLoading: false,
    error: null,
  }),
  getters: {},
  actions: {
    async getPlanet(id: number) {
      this.planetData = {} as Planet;
      this.isLoading = true;

      try {
        this.planetData = await swapiAxios
          .get<Planet>(`planets/${id}`)
          .then((response) => response.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});

// async getData(
//   url: string,
//   param: string,
//   currentStore: any,
//   stateData: string
// ) {
//   const store = currentStore();
//   this.isLoading = true;
//
//   try {
//     store[stateData] = await swapiAxios
//       .get(`${url}${param}`)
//       .then((response) => response.data);
//   } catch (error) {
//     this.error = error;
//   } finally {
//     this.isLoading = false;
//   }
// },
// getPeople(query: string) {
//   this.getData("people/?search=", query, usePeopleStore, "peopleData");
// },
