<template>
  <div>
    <dashboard :display="true">
      <div slot="title">
        Machine cycle launch station
      </div>
      <div class="columns">
        <div class="column" v-for="machine in machines">
          <a href="#" @click="startMachine(machine)">
            <div class="notification is-warning subtitle is-4">Machine 1</div>
          </a>
        </div>
      </div>
    </dashboard>
  </div>
</template>

<script>
// charger les machines
  // is-dark : éteinte
  // is-success : allumée
  // is-primary : allumée par vous

export default {
  data: function() {
    return {
      machines: [],
    }
  },
  mounted() {
    this.getAllMachines()
  },
  methods: {
    getAllMachines: function() {
      var self = this

      axios.get(`${api}machines`).then(function(response) {
        self.machines = response.data
      }).catch(function(err) {
        self.$notify({
          title: 'Error',
          type: 'error'
        })
      })
    },
    startMachine: function(machineID) {
      var self = this

      axios.post(`${api}machines`, {
        name: self.addName,
        mac: self.addMac
      }).then(function(response) {
        self.getAllMachines()

        // notify user
        self.$notify({
          title: 'Machine started',
          type: 'success'
        })
      }).catch(function(err) {
        self.$notify({
          title: 'Machine not started',
          type: 'error'
        })
      })
    }
  }
}
</script>

<style>
.notification {
  text-align: center;
}

.notification.is-warning {
  color: white;
}

.panel {
  padding-top: 10vh;
}

.columns {
  width: 100%
}
</style>
