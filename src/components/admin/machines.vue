<template>

  <div>
    <dashboard :display="display">
      <div slot="title">
        Manage Machines
      </div>
      <div class="table-scroll">
        <table class="table is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>
                Name
              </th>
              <th>
                MAC adress
              </th>
              <th>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <input class="input" v-model="addName">
              </th>
              <th>
                <input class="input" v-model="addMac">
              </th>
              <th>
                <button class="button is-success" @click="add">Add</button>
              </th>
            </tr>
            <tr v-for="machine in machines">
              <th>
                <input class="input" v-model="machine.name"
                @blur="update(machine)"
                @keyup.enter="update(machine)">
              </th>
              <th>
                <input class="input" v-model="machine.mac"
                @blur="update(machine)"
                @keyup.enter="update(machine)">
              </th>
              <th>
                <button class="button is-danger" @click="del(machine)">Delete</button>
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
      display: true,
      machines: [],
      addName: '',
      addMac: ''
    }
  },
  methods: {

    add: function() {
      var self = this
      axios.post(api + 'machines', {
        name: self.addName
      })
      .then(function(response) {

        //On success
        if(response.status == 200) {

          //Add machine to local Array
          self.machines.unshift({
            machineId: response.machineId,
            name: self.addName
          })

          //delete form for new entries
          self.addName = ''

          //notify user
          self.$notify({
            title: "Machine created",
            type: "success"
          })
        }
      })
      .catch(function(err) {

      })
    },
    update: function(machine) {

    },
    del: function(machine) {

    }
  }
}

</script>

<style>


</style>
