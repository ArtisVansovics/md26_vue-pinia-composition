<template>
  <div id="app">
    <nav>
      <RouterLink to="/people">People</RouterLink>
      <RouterLink to="/films">Films</RouterLink>
      <RouterLink to="/planets">Planets</RouterLink>
    </nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped lang="scss" src="./styles/App.scss" />
