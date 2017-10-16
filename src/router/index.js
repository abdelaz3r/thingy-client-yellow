import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'

Vue.use(Router)

Vue.component('top-bar', {
  template: '<div>Top Bar</div>'
});

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: home
    }
  ]
})
