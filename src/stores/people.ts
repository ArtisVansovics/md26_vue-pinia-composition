import { defineStore } from "pinia";
import axios from "axios";
import type { PeopleData } from "@/models/PeopleModel";

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
    async getPeople() {
      this.peopleData = {} as PeopleData;
      this.isLoading = true;

      try {
        this.peopleData = await axios
          .get<PeopleData>("https://swapi.dev/api/people")
          .then((response) => response.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
