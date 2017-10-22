<template>
  <div>
      <div class="level top-space-20">
        <div class="level-item has-text-centered">
          <div class="subtitle is-2">Login @ Smart Loundry</div>
        </div>
      </div>
      <div class="columns top-space-5">
        <div class="column is-one-third">
        </div>
        <div class="column">
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input class="input" type="email" placeholder="Email" v-model="email">
              <span class="icon is-small is-left">
                <i class="fa fa-envelope"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input class="input" type="password" placeholder="Password" v-model="password">
              <span class="icon is-small is-left">
                <i class="fa fa-lock"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <button @click="login()" class="button">
              Login
            </button>
          </div>
        </div>
        <div class="column is-one-third">
        </div>
      </div>
  </div>
</template>

<script>

module.exports = {
  name: 'home',
  data: function() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {

    login: function() {
      //get instance for callbackfunction
      var self = this;

      //send post request to api.
      axios.post(api+'auth/', {
        email: this.email,
        password: this.password
      })
      .then(function(response) {
        if(response.status == 200) {

          //change the login button text
          EventBus.$emit("changeLogButton", "Logout")

          //save auth header for further requests
          Vue.ls.set('authHeader', response.headers)

          //save user, which logged in successfully
          Vue.ls.set('myUser', response.data)

          //foreward the user to the dashboard depending on his role
          if(Vue.ls.get('myUser').role == "admin"){
            self.$router.push('/admin/dashboard')
          }
          else if (Vue.ls.get('myUser').role == "user") {
            self.$router.push('/user/dashboard')
          }

          //notify user
          self.$notify({
            title: "Login successfull",
            type: "success"
          })
        }

      })
      .catch(function(err) {
        //Notify User
        if(err.response.status == 401) {
          self.$notify({
            title: "Wrong Credentials!",
            type: "error"
          })
        }
        else {
          self.$notify({
            title: "Error",
            text: "Error code: " + err.response.status,
            type: "error"
          })
        }
      });
    }
  }
}

</script>

<style>

.top-space-25 {
  padding-top: 25vh;
}

.top-space-20 {
  padding-top: 20vh;
}

.top-space-10 {
  padding-top: 10vh;
}

.top-space-5 {
  padding-top: 5vh;
}

</style>
