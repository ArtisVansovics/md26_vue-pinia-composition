import { defineStore } from "pinia";
import axios from "axios";
import type { PeopleData } from "@/models/PeopleModel";

export const swapiAxios = axios.create({
  baseURL: "https://swapi.dev/api/",
});

interface PeopleState {
  peopleData: PeopleData;
  isLoading: boolean;
  error: null | any;
}

export const usePeopleStore = defineStore({
  id: "people",
  state: (): PeopleState => ({
    peopleData: {} as PeopleData,
    isLoading: false,
    error: null,
  }),
  getters: {},
  actions: {
    async getPeople(query: string) {
      this.peopleData = {} as PeopleData;
      this.isLoading = true;

      try {
        this.peopleData = await swapiAxios
          .get<PeopleData>(`people/?search=${query}`)
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
