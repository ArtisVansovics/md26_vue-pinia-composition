<template>
  <div class="card">
    <h2 class="title"><slot></slot></h2>
    <h3 class="sub-title">Episode <slot name="episodeId"></slot></h3>
    <p>Director: <slot name="director"></slot></p>
    <p>Producer: <slot name="producer"></slot></p>
    <p>Release Date: <slot name="releaseDate"></slot></p>
    <p class="crawl"><slot name="openingCrawl"></slot></p>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "FilmCard",
});
</script>

<style scoped lang="scss" src="./FilmCard.scss" />
