import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import { Tooltip } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

// import "./assets/base.css"
import "./assets/main.css";
import "virtual:uno.css"

import { applyTheme } from "@/theme/applyTheme";

Vue.config.productionTip = false;
Vue.use(Tooltip);

applyTheme(store.state.titleBar.theme);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
