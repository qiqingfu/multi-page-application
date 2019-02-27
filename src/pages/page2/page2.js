import Vue from 'vue'
import App from './page2.vue'
import entryConfig from 'common/entryConfig'

entryConfig(Vue)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
