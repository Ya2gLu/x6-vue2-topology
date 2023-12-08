import Vue from "vue";
import VueRouter from "vue-router";
import Topology from "../views/Topology/Topology.vue"

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Topology,
    },
  ],
});

export default router;
