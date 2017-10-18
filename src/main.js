// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import home from './components/home'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueLocalStorage, {
  name: 'ls',
  createComputed: true //created computed members from your variable declarations
})

global.Vue = Vue
global.axios = axios
global.api = 'http://localhost:8080/'

Vue.config.productionTip = false

/* eslint-disable no-new */
var vue = new Vue({
  el: '#app',
  router,
  //local storage
  ls: {
    authKey: {
      type: String
    },
    authHeader: {
      type: Object
    }
  },
  template: '<App/>',
  components: { App, home }
});
