import Vue from 'vue'
import App from './index.vue'
import router from './router'
import entryConfig from 'common/entryConfig'

entryConfig(Vue)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
