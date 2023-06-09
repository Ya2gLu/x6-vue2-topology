import Vue from "vue";
import Vuex from "vuex";

import titleBar from "./modules/titleBar";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    titleBar,
  },
  strict: debug,
  // plugins: debug ? [createLogger()] : []
});
