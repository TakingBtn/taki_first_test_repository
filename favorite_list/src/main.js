import Vue from 'vue'
// 完整引入 element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import vuetify from './plugins/vuetify'
import App from './App.vue'

Vue.use(ElementUI)

import store from '@/store'
import router from '@/router'

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
  store,
  router
}).$mount('#app')
