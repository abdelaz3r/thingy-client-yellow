<template>
  <div id="app">
    <notifications position="top center"/>
    <div class="container">
      <div class="level top-bar">
        <div class="lefel-left">
          <div class="level-item">
            <a href="#/login" class="subtitle is-4">
              @ Smart Loundry
            </a>
          </div>
        </div>
        <div class="lefel-right">
          <div class="level-item">
            <div @click="log" class="button">{{barTitle}}</div>
          </div>
        </div>
      </div>

<router-view></router-view>

    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  methods: {
    //TODO: Change the login button to logout after login
    //Login/Logout function in the top bar
    log: function() {
      if(Vue.ls.get("myUser")){
        console.log(Vue.ls.get("myUser"))
        Vue.ls.set("myUser", null)
        this.barTitle = "Login"
        this.$router.push("/login")
      }
    }
  },
  data: function() {
    return {
      barTitle: ''
    }
  },
  mounted() {
    //make automatically login, if user is logged in
    if(Vue.ls.get("myUser")){
      //set right title
      this.barTitle = "Logout"

      if(Vue.ls.get("myUser").role == "admin") {
        this.$router.push("/admin/dashboard")
      }
      else {
        this.$router.push("/user/dashboard")
      }
    }
    else {
      this.barTitle = "Login"
    }
  }
}

</script>

<style>
@import "../node_modules/bulma/css/bulma.css";

.top-bar {
  margin-top: 10px;
}
</style>
