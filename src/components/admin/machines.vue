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
                State
              </th>
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
              </td>
              <td>
                <input class="input" v-model="addName">
              </td>
              <td>
                <input class="input" v-model="addMac">
              </td>
              <td>
                <button class="button is-success" @click="add">Add</button>
              </td>
            </tr>
            <tr class="input_as_textfield" v-for="machine in machines">
              <td>

                <div v-show="getStateText(machine) == 'READY' ? true:false">
                  <button class="button is-success" @click="startMachine(machine)">
                    Start Washing
                  </button>
                </div>

                <div v-show="getStateText(machine) == 'READY' ? false:true">
                  {{getStateText(machine)}}
                </div>

              </td>
              <td>
                <input class="input" v-model="machine.name"
                @blur="update(machine)"
                @keyup.enter="update(machine)">
              </td>
              <td>
                <input class="input" v-model="machine.mac"
                @blur="update(machine)"
                @keyup.enter="update(machine)">
              </td>
              <td>
                <router-link
                class="button is-link"
                :to="{ name: 'configuration', params:{machine: machine} }">Configuration</router-link>
              </td>
              <td>
                <button class="button is-danger" @click="del(machine)">Delete</button>
              </td>
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
      addMac: ''
    }
  },
  mounted() {
    this.getAllMachines()
  },
  methods: {

    //make the machine washing
    //TODO: write this method
    //TODO: Make actualization of the states of the machines
    startMachine: function(machine) {
      var self = this

      axios.post(api + "machines/" + machine.machineId + "/start")
      .then(function(response) {
        if(response.status == 200) {

          //actualize the state
          self.getAllMachines()

          self.$notify({
            title: 'Washing cycle started',
            type: 'success'
          })
        }
      })
      .catch(function(err) {
        switch (err.response.status) {
          case 400:
            self.$notify({
              title: 'Invalid parameter provided',
              type: 'error'
            })
            break;

          case 409:
            self.$notify({
              title: 'Error',
              text: 'A learning cycle is already started for this machine or the machine is currently being used',
              type: 'error'
            })

            break;
          default:
            self.$notify({
              title: 'Error ' + err.response.status,
              type: 'error'
            })
        }
      })
    },

    //returns a text for the actual state of a machine
    getStateText: function(machine) {

      if(machine.live.cycle == null){
        return "No state available"
      }
      else {
        switch (machine.live.cycle.state) {
          case "DETERMINED":
            return "The washing cycle has been finished"
            break;

          case "LEARNING":
            return "The machine is learning at the moment"
            break;

          case "READY":
            return "READY"
            break;

          case "DETERMINING":
            return "The algorithm is working in the background"
            break;

          default:
            return "Mierda! Algo no functiona. Pregunta a Trump para resolver el problema!"
            break;
        }
      }
    },

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
      axios.put(api + "machines/" + machine.machineId, {
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
