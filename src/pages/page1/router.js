import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Page1 = (resolve => {
  require.ensure(['./page1.vue'], () => {
      resolve(require('./page1.vue'))
  })
})

// 添加页面前缀
let base = `${process.env.BASE_URL}` + 'page1'

export default new Router({
  mode: 'history',
  base,
  routes: [
    {
      path: '/page1',
      name: 'page1',
      component: Page1
    }
  ]
})