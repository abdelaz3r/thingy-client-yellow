import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import admin_dashboard from '@/components/admin/dashboard'
import user_dashboard from '@/components/user/dashboard'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: home
    },
    {
      path: '/login',
      component: home
    },
    {
      path: '/admin/dashboard',
      component: admin_dashboard
    },
    {
      path: '/user/dashboard',
      component: user_dashboard
    },
    {
      path: '/HelloWorld',
      component: HelloWorld
    }
  ]
})
