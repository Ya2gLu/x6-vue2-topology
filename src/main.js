import Vue from 'vue'

import App from './App.vue'
import router from './router'

import { Tooltip } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import './assets/main.css'

Vue.config.productionTip = false
Vue.use(Tooltip)

const pinia = createPinia()

new Vue({
  router,
  pinia,
  render: h => h(App),
}).$mount('#app')
