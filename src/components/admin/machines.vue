<template>

  <div>
    <dashboard :display="true">
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
              <th>
              </th>
              <th>
              </th>
              <th>
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
            <tr class="input_as_textfield" v-for="machine in machines">
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
                <router-link
                class="button is-warning"
                :to="{ path: 'configuration/' + machine.mac }">Configuration</router-link>
              </th>
              <th>
                <router-link
                class="button is-info"
                :to="{ path: 'statistics/' + machine.mac }">Statistics</router-link>
              </th>
              <th>
                <router-link
                class="button is-link"
                :to="{ path: 'programs' }">Programs</router-link>
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
      machines: [],
      addName: '',
      addMac: '',
    }
  },
  mounted() {
    this.getAllMachines()
  },
  methods: {
    getAllMachines: function() {
      var self = this
      //get all machines form api
      axios.get(api + "machines")
      .then(function(response) {
        self.machines = response.data
      })
      .catch(function(err) {
        self.$notify({
          title: "Error",
          text: err.response.status,
          type: "error"
        })
      })
    },

    add: function() {
      var self = this
      console.log({
        name: self.addName,
        mac: self.addMac
      })
      axios.post(api + 'machines', {
        name: self.addName,
        mac: self.addMac
      })
      .then(function(response) {

        //On success
        if(response.status == 200) {

          //update machine list
          self.getAllMachines()

          //delete form for new entries
          self.addName = ''
          self.addMac = ''

          //notify user
          self.$notify({
            title: "Machine created",
            type: "success"
          })
        }
      })
      .catch(function(err) {
        if(err.response.status == 409) {
          self.$notify({
            title: "Name or Macadress already exist",
            text: "Nothing saved",
            type: "error"
          })
        }
        else {
          self.$notify({
            title: "Error",
            text: err.response.status,
            type: "error"
          })
        }
      })
    },

    update: function(machine) {
      var self = this
      axios.post(api + "machines/" + machine.machineId, {
        name: machine.name,
        mac: machine.mac
      })
      .then(function(response) {
        if(response.status == 200) {
          self.$notify({
            title: "Machine updated",
            type: "success"
          })
        }
      })
      .catch(function(err) {
        if(err.response.status == 409) {
          self.$notify({
            title: "Name or Mac adress already exist",
            text: "Nothing saved",
            type: "error"
          })

        }
        else {
          self.$notify({
            title: "Error",
            text: err.response.status,
            type: "error"
          })
        }
      })

    },
    del: function(machine) {
      var self = this
      axios.delete(api + "machines/" + machine.machineId)
      .then(function(response) {
        if(response.status == 200){
          self.$notify({
            title: "Machine deleted",
            type: "success"
          })

          Array.prototype.indexOfElement = function(value) {
            for (var i = 0; i < this.length; i++)
              if (this[i].machineId === value) {
                return i;
              }
            return -1;
          }

          var position = self.machines.indexOfElement(machine.machineId);
          self.machines.splice(position,1)
        }
      })
      .catch(function(err) {
        self.$notify({
          title: "Error",
          type: "error"
        })
      })
    }
  }
}

</script>

<style>
.table-scroll {
  overflow-x:auto;
}

.button {
  font-weight: normal
}

.input_as_textfield input {
  box-shadow: none;
  border: none;
  font-size: 16px;
}
</style>
