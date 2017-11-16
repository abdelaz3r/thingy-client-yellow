<template>
  <div>
    <dashboard :display="true">
      <div slot="title">
        Manage Users
      </div>
      <div class="table-scroll">
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
              <th><input class="input minsize120" v-model="addFirstname"></th>
              <th><input class="input minsize120" v-model="addLastname"></th>
              <th><input class="input minsize120" v-model="addEmail"></th>
              <th>
                <div class="select" @change="onChange($event.target.value)">
                  <select>
                    <option  v-for="role in roles" v-bind:value="role.name">{{role.name}}</option>
                  </select>
                </div>
              </th>
              <th><input class="input minsize120" v-model="addPassword"></th>
              <th><button class="button is-success" @click="add">Add</button></th>
            </tr>
            <tr class="input_as_textfield" v-for="user in users">
              <th>
                <input class="input" v-model="user.firstname"
                @keyup.enter="update(user)"
                @blur="update(user)">
              </th>
              <th>
                <input class="input" v-model="user.lastname"
                @keyup.enter="update(user)"
                @blur="update(user)">
              </th>
              <th>
                <input class="input" type="email" v-model="user.email"
                @keyup.enter="update(user)"
                @blur="update(user)">
              </th>
              <th>
                <div class="select" @change="update(user, $event.target.value)">
                  <select>
                    <option  v-for="role in roles" v-bind:value="role.name" :selected="role.name == user.role">{{role.name}}</option>
                  </select>
                </div>
              </th>
              <th>
                <input class="input" value="set new password"
                @keyup.enter="update(user, user.role, $event.target.value)"
                @blur="update(user, user.role, $event.target.value)">
              </th>
              <th>
                <button class="button is-danger" v-on:click="del(user.userId)">Delete</button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </dashboard>
  </div>
</template>

<script>

export default {
  data: function() {
    return {
      addFirstname: '',
      addLastname: '',
      addEmail: '',
      addRole: 'user',
      addPassword: '',
      users: [],
      roles: [
        {name: "user"},
        {name: "admin"}
      ]
    }
  },
  mounted() {
    this.getAllUsers()
  },
  methods: {
    onChange: function(role) {
      this.addRole = role
    },

    //load list from api, when components are fully loaded
    getAllUsers: function() {
      var self = this
      axios.get(api+'users')
      .then(function(response) {
        self.users = response.data
      })
      .catch(function(err) {

      })
    },
    //update user
    update: function(user, role, password) {
      var self = this
      axios.put(api + 'users/' + user.userId, {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: password,
        role: role
      })
      .then(function(response) {

        //Generate Notifications
        if(response.status == 200) {
          self.$notify({
            title: "User Updated",
            type: "success"
          })
        }
      })
      .catch(function(err) {
        //console.log(err)
        if(err.response.status == 409) {
          self.$notify({
            title: "Conflict with an existing email",
            text: "nothing saved",
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
        self.getAllUsers()
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

          self.$notify({
            title: "User deleted",
            type: "success"
          })
        }
      })
      .catch(function(err) {
        self.$notify({
          title: "Error",
          text: "Error code: " + err.response.status,
          type: "error"
        })
      })
    },

    add: function() {
      console.log("selected: " + this.addRole)

      var self = this
      axios.post(api + 'users', {
        firstname: this.addFirstname,
        lastname: this.addLastname,
        email: this.addEmail,
        password: this.addPassword,
        role: this.addRole
      })
      .then(function(response) {

        //Update user list
        self.getAllUsers()

        //empty form
        self.addPassword = ''
        self.addFirstname = ''
        self.addLastname = ''
        self.addEmail = ''
        self.addRole = 'user'

        if(response.status == 200) {
          self.$notify({
            title: "User created",
            type: "success"
          })
        }
      })
      .catch(function(err) {
        //console.log(err)
        if(err.response.status == 409) {
          self.$notify({
            title: "Conflict with an existing email",
            text: "nothing saved",
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
      })
    }
  }
}

</script>

<style>
.table tbody tr th {
  font-weight: normal;
}

.minsize120 {
  min-width: 120px;
}

.table-scroll {
  overflow-x:auto;
}

.input_as_textfield input {
  box-shadow: none;
  border: none;
  font-size: 16px;
}
</style>
