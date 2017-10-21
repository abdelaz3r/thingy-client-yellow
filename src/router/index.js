import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
//ADMIN components
import adminDashboard from '@/components/admin/dashboard'
import adminUsers from '@/components/admin/users'
import adminMachines from '@/components/admin/machines'

//USER components
import userDashboard from '@/components/user/dashboard'

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

    //ADMIN PATH
    {
      path: '/admin/dashboard',
      component: adminDashboard
    },
    {
      path: '/admin/users',
      component: adminUsers
    },
    {
      path: '/admin/machines',
      component: adminMachines
    },

    //USER PATH
    {
      path: '/user/dashboard',
      component: userDashboard
    }
  ]
})
