import { createRouter, createWebHistory } from "vue-router";
import PeopleView from "@/views/PeopleView/PeopleView.vue";
import FilmsView from "@/views/FilmsView/FilmsView.vue";
import PlanetsView from "@/views/PlanetsView/PlanetsView.vue";
import PlanetView from "@/views/PlanetView/PlanetView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/people",
      alias: "/",
      name: "people",
      component: PeopleView,
    },
    {
      path: "/films",
      name: "films",
      component: FilmsView,
    },
    {
      path: "/planets",
      name: "planets",
      component: PlanetsView,
    },
    {
      path: "/planets/:id",
      name: "planet",
      component: PlanetView,
    },
  ],
});

export default router;
