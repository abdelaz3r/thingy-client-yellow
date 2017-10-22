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
            <div @click="log" class="button">{{LogButton}}</div>

          </div>
        </div>
      </div>

<router-view></router-view>

    </div>
  </div>
</template>

<script>

module.exports = {
  name: 'App',
  methods: {

    //Login/Logout text in the top bar
    log: function() {

      //If user is logged in, log it out
      if(Vue.ls.get("myUser")){
        Vue.ls.set("myUser", null)
        this.LogButton = "Login"
        this.$router.push("/login")
      }
    }
  },
  data: function() {
    return {
      LogButton: null
    }
  },
  created: function(){
  	EventBus.$on('changeLogButton', (buttonState)=>{
      this.LogButton = buttonState;
    })
  },
  mounted() {
    //make automatically login, if user is logged in
    if(Vue.ls.get("myUser")){
      //set right title
      this.LogButton = "Logout"
      if(Vue.ls.get("myUser").role == "admin") {
        this.$router.push("/admin/dashboard")
      }
      else {
        this.$router.push("/user/dashboard")
      }
    }
    else {
      this.LogButton = "Login"
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
