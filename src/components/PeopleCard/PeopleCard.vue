<template>
  <div class="card">
    <h3 class="name"><slot></slot></h3>
    <p class="text">Born: <slot name="birthYear"></slot></p>
    <div class="grid">
      <p class="with-numbers">Height: <slot name="height"></slot> cm</p>
      <p class="with-numbers">Mass: <slot name="mass"></slot> kg</p>
      <p>Hair color: <slot name="hairColor"></slot></p>
      <p>Skin color: <slot name="skinColor"></slot></p>
      <p>Eye color: <slot name="eyeColor"></slot></p>
      <p>Gender: <slot name="gender"></slot></p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PeopleCard",
});
</script>

<style scoped lang="scss" src="./PeopleCard.scss" />
