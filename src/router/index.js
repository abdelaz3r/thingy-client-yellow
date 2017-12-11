import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'

// ADMIN components
import adminDashboard from '@/components/admin/dashboard'
import adminUsers from '@/components/admin/users'
import adminMachines from '@/components/admin/machines'
import adminPrograms from '@/components/admin/programs'
import adminStatistics from '@/components/admin/statistics'
import adminConfiguration from '@/components/admin/configuration'

// USER components
import userDashboard from '@/components/user/dashboard'
import userLaunchCycle from '@/components/user/launch-cycle'
import userAnalytics from '@/components/user/user-analytics'
import userSettings from '@/components/user/user-settings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/login',
      component: login
    },

    // ADMIN PATH
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
    {
      name: 'statistics',
      path: '/admin/statistics',
      component: adminStatistics,
      props: true
    },
    {
      name: 'programs',
      path: '/admin/programs',
      component: adminPrograms,
      props: true
    },
    {
      name: 'configuration',
      path: '/admin/configuration',
      component: adminConfiguration,
      props: true
    },

    // USER PATH
    {
      path: '/user/dashboard',
      component: userDashboard
    }, {
      path: '/user/launch-cycle',
      component: userLaunchCycle
    }, {
      path: '/user/user-analytics',
      component: userAnalytics
    }, {
      path: '/user/settings',
      component: userSettings
    }
  ]
})
