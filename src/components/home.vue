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
          <button v-on:click="login" class="button">
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

export default {
  name: 'home',
  data: function() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    /**
    *   Todo: Using vue-session instead of local storage?
    *   Todo: Display errors for users, make all cases
    *   Todo: Make logout
    *   Todo: Comments
    *   Todo: Get admin flag from API until it's ready
    **/
    login: function() {
      var self = this;
      axios.post(api+'auth/', {
        email: this.email,
        password: this.password
      })
      .then(function(response) {
        switch (response.status) {
          case 200:
            Vue.ls.set('header', response.headers)
            self.$router.push('/admin/dashboard')
            break;

          case 401:

            break;
          default:
            self.$router.push('/')
        }
      })
      .catch(function(error) {
        console.log(error);
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
