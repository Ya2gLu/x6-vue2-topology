import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import { Tooltip } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import './assets/main.css'

Vue.config.productionTip = false
Vue.use(Tooltip)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
