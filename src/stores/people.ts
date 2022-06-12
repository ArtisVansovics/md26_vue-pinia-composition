import { defineStore } from "pinia";
import axios from "axios";
import type { PeopleData } from "@/models/PeopleModel";

const swapiPeople = axios.create({
  baseURL: "https://swapi.dev/api/people",
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
        this.peopleData = await swapiPeople
          .get<PeopleData>(`/?search=${query}`)
          .then((response) => response.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});

// actions: {
//   setNameQuery(query: string) {
//     this.nameQuery = query;
//   },
//   async getPeople() {
//     this.peopleData = {} as PeopleData;
//     this.isLoading = true;
//
//     try {
//       this.peopleData = await swapiPeople
//         .get<PeopleData>(`/?search=${this.nameQuery}`)
//         .then((response) => response.data);
//     } catch (error) {
//       this.error = error;
//     } finally {
//       this.isLoading = false;
//     }
//   },
// },
