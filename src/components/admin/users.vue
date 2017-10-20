<template>
  <div>
    <dashboard :display="display">
      <div slot="title">
        Manage Users
      </div>
      <table class="table is-fullwidth is-hoverable">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>User role</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th><input class="input" v-model="addFirstname"></th>
            <th><input class="input" v-model="addLastname"></th>
            <th><input class="input" v-model="addEmail"></th>
            <th>
              <div class="select" v-model="addAdmin">
                <select>
                  <option>user</option>
                  <option>admin</option>
                </select>
              </div>
            </th>
            <th><input class="input" v-model="addPassword"></th>
            <th><button class="button is-success" @click="addNewUser">Add</button></th>
          </tr>
          <tr class="input_as_textfield" v-for="user in users">
            <th>
              <input class="input" v-model="user.firstname"
              @keyup.enter="save(user)"
              @blur="save(user)">
            </th>
            <th>
              <input class="input" v-model="user.lastname"
              @keyup.enter="save(user)"
              @blur="save(user)">
            </th>
            <th>
              <input class="input" size="40" type="email" v-model="user.email"
              @keyup.enter="save(user)"
              @blur="save(user)">
            </th>
            <th>
              <div class="select" v-model="user.admin">
                <select>
                  <option>user</option>
                  <option>admin</option>
                </select>
              </div>
            </th>
            <th>
              <input class="input" value="set new password"
              @keyup.enter="save(user, $event.target.value)"
              @blur="save(user, $event.target.value)">
            </th>
            <th>
              <button class="button is-danger" v-on:click="del(user.userId)">Delete</button>
            </th>
          </tr>
        </tbody>
      </table>
    </dashboard>
  </div>
</template>

<script>
/*
  TODO: Handle errors from api
*/
import dashboard from '../templates/dashboard'

export default {
  components: {
    dashboard
  },
  data: function() {
    return {
      addFirstname: '',
      addLastname: '',
      addEmail: '',
      addAdmin: '',
      addPassword: '',
      display: true,
      users: []
    }
  },
  mounted() {

    //load list from api, when components are fully loaded
    var self = this
    axios.get(api+'users')
    .then(function(response) {
      self.users = response.data
    })
    .catch(function(err) {

    })
  },
  methods: {

    //update user
    save: function(user, password) {
      var self = this
      axios.post(api + 'users/' + user.userId, {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: password
      })
      .then(function(response) {

      })
      .catch(function(err) {

      })
    },

    //Delete User
    del: function(id) {
      var self = this

      axios.delete(api + 'users/' + id)
      .then(function(response) {
        if(response.status == 200) {

          Array.prototype.indexOfElement = function(value) {
            for (var i = 0; i < this.length; i++)
              if (this[i].userId === value) {
                return i;
              }
            return -1;
          }

          var position = self.users.indexOfElement(id);
          self.users.splice(position,1)
        }
      })
      .catch(function(err) {
        console.log(err);
      })
    },

    addNewUser: function() {
      var self = this
      axios.post(api + 'users', {
        firstname: this.addFirstname,
        lastname: this.addLastname,
        email: this.addEmail,
        password: this.addPassword
      })
      .then(function(response) {

        self.users.unshift({
          userId: response.data.userId,
          firstname: self.addFirstname,
          lastname: self.addLastname,
          email: self.addEmail
        })

        //empty form
        self.addPassword = ''
        self.addFirstname = ''
        self.addLastname = ''
        self.addEmail = ''
      })
      .catch(function(err) {
        console.log(err)
      })
    }
  }
}

</script>

<style>
.table tbody tr th {
  font-weight: normal;
}

.input_as_textfield input {
  box-shadow: none;
  border: none;
  font-size: 16px;
}
</style>
