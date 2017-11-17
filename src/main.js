// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import home from './components/home'
import VueLocalStorage from 'vue-localstorage'
import Notifications from 'vue-notification'

//Import components
import dashboard from './components/templates/dashboard'

Vue.use(VueLocalStorage, {
  name: 'ls',
  createComputed: true //created computed members from your variable declarations
})
Vue.use(Notifications)

//define global variables
global.Vue = Vue
global.axios = axios
global.api = 'http://localhost:8080/'
global.EventBus = new Vue();

Vue.config.productionTip = false

Vue.component("home", home)
Vue.component("App", App)
Vue.component("dashboard", dashboard)

/* eslint-disable no-new */
var vue = new Vue({
  el: '#app',
  router,
  //local storage
  ls: {
    authHeader: {
      type: Object
    },
    myUser: {
      type: Object
    },
    tempNavMachine: {
      type: Object
    }
  },
  template: '<App/>'
});
