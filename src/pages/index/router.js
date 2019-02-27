import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = (resolve => {
  require.ensure(['./index.vue'], () => {
      resolve(require('./index.vue'))
  })
})

// 添加页面前缀
let base = `${process.env.BASE_URL}` + 'index'

export default new Router({
  mode: 'history',
  base,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})