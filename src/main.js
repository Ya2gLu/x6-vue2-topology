import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import { Tooltip } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

// import "./assets/base.css"
import "./assets/main.css";
import "virtual:uno.css"

Vue.config.productionTip = false;
Vue.use(Tooltip);

const theme = store.state.titleBar.theme;
document.documentElement.classList.toggle('dark', theme === 'dark');

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
