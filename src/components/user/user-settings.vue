<template>
  <div>
    <a href="#/user/dashboard" class="button is-middle">
      < Back
    </a>

    <hr />

    <h1 class="title">
      User settings
    </h1>

    <div class="container">
      <div class="field">
        <label class="label">Firstname</label>
        <div class="control">
          <input class="input" type="text" v-model="firstname">
        </div>
      </div>
      <div class="field">
        <label class="label">Lastname</label>
        <div class="control">
          <input class="input" type="text" v-model="lastname">
        </div>
      </div>
      <div class="field">
        <label class="label">Notification Token</label>
        <div class="control">
          <input class="input" type="text" v-model="notification_token">
        </div>
      </div>
      <div class="field">
        <label class="label">Notification Token for Application</label>
        <div class="control">
          <input class="input" type="text" v-model="notification_token_application">
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-primary" @click="updateUser">Save</button>
        </div>
      </div>
    </div>

    <hr />

    <h1 class="subtitle">
      Update password
    </h1>

    <div class="container">
      <div class="field">
        <label class="label">New Password</label>
        <div class="control">
          <input class="input" type="password" v-model="password">
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-primary" @click="updateUserPassword">Save</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      user: undefined,
      firstname: '',
      lastname: '',
      notification_token: '',
      notification_token_application: '',
      password: ''
    }
  },
  mounted () {
    this.user = Vue.ls.get('myUser')

    this.firstname = this.user.firstname,
    this.lastname = this.user.lastname,
    this.notification_token = this.user.notification_token,
    this.notification_token_application = this.user.notification_token_application
  },
  methods: {
    updateUser() {
      var self = this

      axios.put(api + 'users/' + self.user.userId, {
        firstname: self.firstname,
        lastname: self.lastname,
        notification_token: self.notification_token,
        notification_token_application: self.notification_token_application
      }).then(function(response) {
        if (response.status == 200) {
          self.$notify({
            title: 'User Updated',
            type: 'success'
          })
        }
      }).catch(function(err) {
        self.$notify({
          title: 'Error',
          text: 'Error code: ' + err.response.status,
          type: 'error'
        })
      })
    },
    updateUserPassword() {
      var self = this

      axios.put(api + 'users/' + self.user.userId, {
        password: self.password
      }).then(function(response) {
        if (response.status == 200) {
          self.$notify({
            title: 'User password updated',
            type: 'success'
          })
        }
      }).catch(function(err) {
        self.$notify({
          title: 'Error',
          text: 'Error code: ' + err.response.status,
          type: 'error'
        })
      })
    }
  }
}
</script>