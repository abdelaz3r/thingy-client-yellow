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
          <th contenteditable="true" v-model="firstname">{{user.firstname}}</th>
          <th contenteditable="true">{{user.lastname}}</th>
          <th contenteditable="true">{{user.email}}</th>
          <th contenteditable="true">{{user.admin}}</th>
          <th>
            <button class="button is-danger">Delete</button>
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
      firstname: '',
      users: [
        {firstname: "Michael", lastname: "Scheurer", email: "michael.scheurer@derbund.ch", admin: "yes"},
        {firstname: "Mr. X", lastname: "Test", email: "x.test@tester.com", admin: "no"}
      ]
    }
  },
  methods: {
    getUsers: function() {
      axios.get(api+'')
    }
  }
}

</script>

<style>
.table tbody tr th {
  font-weight: normal;
}
</style>
