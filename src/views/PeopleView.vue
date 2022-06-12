<template>
  <h1>People</h1>
  <form v-on:submit.prevent="getPeople(queryValue)">
    <input type="text" v-model="queryValue" />
    <button>Search</button>
  </form>
  <p v-if="isLoading">Loading...</p>
  <p v-if="error">{{ error.message }}</p>
  <p v-for="{ name, birth_year } in people" :key="name">
    {{ name }} {{ birth_year }}
  </p>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from "vue";
import { usePeopleStore } from "@/stores/people";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "PeopleView",
  setup() {
    const queryValue = ref("");
    const { peopleData, isLoading, error } = storeToRefs(usePeopleStore());
    const { getPeople } = usePeopleStore();

    const people = computed(() => {
      return peopleData.value.results;
    });

    getPeople("");

    return {
      isLoading,
      queryValue,
      people,
      error,
      getPeople,
    };
  },
});
</script>

<style scoped lang="scss" />
