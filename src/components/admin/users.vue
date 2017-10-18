<template>
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
          <th>Is Admin?</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users">
          <div style="display: none;" v-model="id">{{user.id}}</div>
          <th contenteditable="true" v-model="firstname" v-on:DOMCharacterDataModified="save(user.id, user.firstname)">
            {{user.firstname}}
          </th>
          <th contenteditable="true" v-model="lastname" v-on:DOMCharacterDataModified="save(user.id)">
            {{user.lastname}}
          </th>
          <th contenteditable="true" v-model="email" v-on:DOMCharacterDataModified="save(user.id)">
            {{user.email}}
          </th>
          <th contenteditable="true" v-model="admin" v-on:DOMCharacterDataModified="save(user.id)">
            {{user.admin}}
          </th>
          <th>
            <button class="button is-danger" v-on:click="del(user.id)">Delete</button>
          </th>
        </tr>
      </tbody>
    </table>
  </dashboard>
</template>

<script>
import dashboard from '../templates/dashboard'

export default {
  components: {
    dashboard
  },
  data: function() {
    return {
      display: true,
      delbutton: '',
      id: '',
      firstname: '',
      lastname: '',
      email: '',
      admin: '',
      users: [
        {id: 3, firstname: "Michael", lastname: "Scheurer", email: "michael.scheurer@derbund.ch", admin: "yes"},
        {id: 4, firstname: "Mr. X", lastname: "Test", email: "x.test@tester.com", admin: "no"}
      ]
    }
  },
  methods: {
    getUsers: function() {
      axios.get(api+'')
    },
    save: function(id, firstname) {
      console.log("save " + firstname + id)
    },
    del: function(id) {
      console.log("deleted " + id)
    }
  }
}

</script>

<style>
.table tbody tr th {
  font-weight: normal;
}
</style>
