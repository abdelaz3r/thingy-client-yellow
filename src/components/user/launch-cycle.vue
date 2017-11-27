<template>
  <div>
    <dashboard :display="true">
      <div slot="title">
        Machine cycle launch station
      </div>
      <div class="columns">
        <div class="column" v-for="machine in machines">
          <a href="#" @click="startMachine(machine)">
            <div class="notification subtitle is-4" v-bind:class="getStateColor(machine.id)">{{ machine.name }}</div>
          </a>
        </div>
      </div>
    </dashboard>
  </div>
</template>

<script>
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

        console.log(response.data)
      }).catch(function(err) {
        self.$notify({
          title: 'Error',
          type: 'error'
        })
      })
    },
    startMachine: function(machine) {
      var self = this

      axios.post(`${api}machines/${machine.machineId}/start`).then(function(response) {
        self.getAllMachines()

        // notify user
        self.$notify({
          title: 'Machine started',
          type: 'success'
        })
      }).catch(function(err) {
        console.log(err)
        self.$notify({
          title: 'Machine not started',
          type: 'error'
        })
      })
    },
    getStateColor: function(state) {
      switch (state) {
        case 'Eteinte': return 'is-dark'; break;
        case 'Allumée': return 'is-success'; break;
        case 'self-allumée': return 'is-primary'; break;
        default: return 'is-grey'; break;
      }
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
