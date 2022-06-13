<template>
  <h1>People</h1>
  <form v-on:submit.prevent="handleSearch">
    <input type="text" v-model="inputValue" />
    <button>Search</button>
  </form>
  <p v-if="isLoading">Loading...</p>
  <p v-if="error">{{ error.message }}</p>
  <div v-if="people" class="grid">
    <PeopleCard
      v-for="{
        name,
        height,
        mass,
        hair_color,
        skin_color,
        eye_color,
        birth_year,
        gender,
      } in people"
      :key="name"
    >
      {{ name }}
      <template #birthYear>{{ birth_year }}</template>
      <template #height>{{ height }}</template>
      <template #mass>{{ mass }}</template>
      <template #hairColor>{{ hair_color }}</template>
      <template #skinColor>{{ skin_color }}</template>
      <template #eyeColor>{{ eye_color }}</template>
      <template #gender>{{ gender }}</template>
    </PeopleCard>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from "vue";
import { usePeopleStore } from "@/stores/people";
import { storeToRefs } from "pinia";
import PeopleCard from "@/components/PeopleCard/PeopleCard.vue";

export default defineComponent({
  name: "PeopleView",
  components: { PeopleCard },
  setup() {
    const inputValue = ref("");
    const { peopleData, isLoading, error } = storeToRefs(usePeopleStore());
    const { getPeople } = usePeopleStore();

    const people = computed(() => {
      return peopleData.value.results;
    });

    function handleSearch() {
      getPeople(inputValue.value);
      inputValue.value = "";
    }

    getPeople("");

    return {
      isLoading,
      inputValue,
      people,
      error,
      handleSearch,
    };
  },
});
</script>

<style scoped lang="scss" src="./PeopleView.scss" />
