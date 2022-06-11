<template>
  <NavigationBar>
    <RouterLink to="/people">People</RouterLink>
    <RouterLink to="/films">Films</RouterLink>
    <RouterLink to="/planets">Planets</RouterLink>
  </NavigationBar>
  <div id="app">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
</script>

<style scoped lang="scss" src="./styles/App.scss" />
