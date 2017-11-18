<template>
  <div>

    <dashboard :display="true">
      <div slot="title">
        Start Machine Learning with <p style="display: inline; font-weight: bold;">{{ machine.name }}</p>
      </div>

      <div class="table-scroll">
        <br>
        <table class="table is-fullwidth">
          <tbody>

            <!-- show this section, if Machine is ready -->
            <tr v-show="this.state == 'READY' ? true : false ">
                <td>
                  <div class="select">
                    <select v-model="selectedMcProgram">
                      <option v-for="mcProgram in relatedPrograms" :value="mcProgram">{{ mcProgram.cyclename }}</option>
                    </select>
                  </div>
                </td>
                <td>
                  <button class="button is-success" :disabled="selectedMcProgram.cyclename == null" @click="recordMc">
                    {{ relatedPrograms.length > 0 ? ( selectedMcProgram.cyclename == null ? 'Select a program to record' : 'Record the ' + selectedMcProgram.cyclename + ' program' ) : 'Relate a washing program to the machine' }}
                  </button>
                </td>
            </tr>

            <!-- show this section, if the machine is not ready -->
            <tr v-show="state == 'READY' ? false : true ">
                <td>
                  The Machine is {{ state }} at the moment
                </td>
                <td>
                  <button class="button is-danger" @click="stopLearning">
                    Stop Learning
                  </button>
                </td>
            </tr>

          </tbody>
        </table>
      </div>
    </dashboard>

    <dashboard>
      <div slot="title">
        All recorded machine learning cycles for <p style="display: inline; font-weight: bold;">{{ machine.name }}</p>
      </div>

      <div class="table-scroll">
        <!-- show all recorded cycles -->
        Select a program <br>
        <div class="select">
          <select v-model="programFilter" @change="getRecordedCycles">
            <option v-for="program in allPrograms" :value="program">{{ program.cyclename }}</option>
          </select>
        </div>

        <table class="table is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>
                Washing Program
              </th>
              <th>
                Duration (s)
              </th>
              <th>
                Started
              </th>
              <th>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-show="cycles.length == 0">
              <td colspan="4">
                No record found for this program
              </td>
            </tr>
            <tr v-for="cycle in cycles">
              <td>
                {{ cycle.cyclename }}
              </td>
              <td>
                {{ cycle.duration }}
              </td>
              <td>
                {{ cycle.started }}
              </td>
              <td>
                <button class="button is-danger" @click="deleteCycle(cycle)">
                  delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </dashboard>

    <dashboard>
      <div slot="title">
        Related Programs to the machine <p style="display: inline; font-weight: bold;">{{ machine.name }}</p>
      </div>

      <div class="table-scroll">
        <table class="table is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>
                Name
              </th>
              <th>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="select">
                  <select v-model="selectedProgram">
                    <option v-for="program in remainingPrograms" :value="program" :selected="true">{{ program.cyclename }}</option>
                  </select>
                </div>
              </td>
              <td>
                <button class="button is-success" :disabled="selectedProgram.cyclename == null" @click="relate">
                  {{ selectedProgram.cyclename == null ? 'Select a program to relate to the machine' : 'Relate ' + selectedProgram.cyclename + ' to the machine'}}
                </button>
              </td>
              <td>
                <router-link v-on:click.native="addTempNavMachine" :to="{ name: 'programs' }">Edit all programs</router-link>
              </td>
            </tr>
            <tr class="input_as_textfield" v-for="relatedProgram in relatedPrograms">
              <td>
                <input class="input" v-model="relatedProgram.cyclename"
                @blur="update(relatedProgram)"
                @keyup.enter="update(relatedProgram)">
              </td>
              <td>
                <button class="button is-danger" @click="unrelate(relatedProgram)">delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </dashboard>

    <dashboard>
      <div slot="title">
        Live Data
      </div>

      <br>
      Humidity: {{machine.live.sensors.humidity}}
      <br>
      Temperature: {{machine.live.sensors.temperature}}
      <br>
      State: {{state}}

    </dashboard>

  </div>
</template>

<script>
export default {
  data: function() {
    return {
      machine: '',
      relatedPrograms: [],
      allPrograms: [],
      remainingPrograms: [],
      cycles: [],
      selectedProgram: '',
      selectedMcProgram: '',
      state: '',
      programFilter: ''
    }
  },
  mounted() {
    //get and set the groundlaying data
    this.getMachine()
    this.getPrograms(false)
    this.getPrograms(true)

    //get the actual state of the machine
    if(this.machine.live.cycle == null) {
      this.state = "No state available at the moment"
    }
    else {
      this.state = this.machine.live.cycle.state
    }
  },
  methods: {

    //get all recorded cycles for that machine depending on the filter
    getRecordedCycles: function() {
      var self = this
      axios.get(api + "programs/" + this.programFilter.programId + "/machine/" + this.machine.machineId + "/learning")
      .then(function(response) {
        if(response.status == 200){
          self.cycles = response.data

          self.$notify({
            title: "Loaded the learning cycles",
            type: "success"
          })
        }
      })
      .catch(function(err) {
        self.$notify({
          title: "Error " + err.response.status,
          type: "error"
        })
      })
    },

    //actualize the properties of a machine such as live data and the state
    //this method can be extended
    actualizeMachine: function(){
      this.actualizeLiveData()
      this.actualizeMachineState()
    },

    //get the actual state of the machine
    actualizeMachineState: function() {
      var self = this
      axios.get(api + "machines/" + this.machine.machineId + "/live/cycle")
      .then(function(response) {
        if(response.status == 200) {

          //actualize state of the machine
          self.machine.live.cycle.state = response.data.state
          self.state = response.data.state
        }
      })
      .catch(function(err) {
        //notify user of errors
        self.$notify({
          title: "Error" + err.response.status,
          type: "error"
        })
      })
    },

    //actualizes the live data of the machine such as temperature and humidity
    actualizeLiveData: function() {
      var self = this
      axios.get(api + "machines/" + this.machine.machineId + "/live/sensors")
      .then(function(response) {

        //actualize the sensor data of the machine
        self.machine.live.sensors.temperature = response.data.temperature
        self.machine.live.sensors.humidity = response.data.humidity
      })
      .catch(function(err) {

        //notify the user, if an error occours
        self.$notify({
          title: "Error" + err.response.status,
          type: "error"
        })
      })
    },

    //delte a recorded machine learning cycle
    deleteCycle: function(cycle) {
      var self = this
      axios.delete(api + "programs/" + this.programFilter.programId + "/machine/" + this.machine.machineId + "/learning/" + cycle.recordingId)
      .then(function(response) {
        if(response.status == 200){

          //update list
          self.getRecordedCycles()

          self.$notify({
            title: "Deleted record",
            type: "success"
          })
        }
      })
      .catch(function(err) {
        self.$notify({
          title: "Error" + err.response.status,
          type: "error"
        })
      })
    },

    // load the actual machine
    getMachine: function(){
      //if we come back from all programs load the machine stored in the local store
      if (typeof this.$route.params.machine == 'undefined'){
        this.machine = Vue.ls.get("tempNavMachine")
      }

      //if we come from the machine overview get the machine object from the router props
      else {
        this.machine = this.$route.params.machine
      }
    },

    //add the actual machine to the local store if we navigate to all Programs
    //So that when we come back, we still have the machine object available
    addTempNavMachine: function() {
      Vue.ls.set("tempNavMachine", this.machine)
    },

    //Diff Porgram Arrays
    diffPrograms: function(array1, array2){
      for(var i = 0; i < array1.length; i++) {
        for(var b = 0; b < array2.length; b++) {
          if(array1[i].cyclename == array2[b].cyclename) {
            array1.splice(i, 1)
          }
        }
      }
      return array1
    },

    //list all programs
    getPrograms: function(onlyRelated = true) {
      var url = api + "programs"

      if(onlyRelated) {
        url += "/machine/" + this.machine.machineId
      }

      //get programs from api
      var self = this;
      axios.get(url)
      .then(function(response) {
        if(onlyRelated) {
          self.relatedPrograms = response.data
        }
        else {
          self.allPrograms = response.data
        }

        var tmpAllPrograms = self.allPrograms.slice()

        //only show programs which can still added to the machine
        self.remainingPrograms = self.diffPrograms(tmpAllPrograms, self.relatedPrograms)
      })
      .catch(function(err) {
        self.$notify({
          title: "Error getting the program list",
          text: err.response.status,
          type: "error"
        })
      })
    },

    //relate a washing program to the machine
    relate: function() {
      var self = this

      //Check first, if a program is selected. If not show error notification
      if(this.selectedProgram.programId == null) {
        this.$notify({
          title: "No Program selected!",
          text: "Please select a program from the dropdown to relate to the machine",
          type: "error"
        })
      }

      //if so, relate the program to the machine
      else {
        axios.post(api + "programs/machine", {
          programid: this.selectedProgram.programId,
          machineid: this.machine.machineId
        })
        .then(function(response) {
          if(response.status == 200){

            //update program list
            self.getPrograms(true)

            //delete from selection
            self.selectedProgram = ''

            self.$notify({
              title: "Program related",
              type: "success"
            })
          }
        })
        .catch(function(err) {
          self.$notify({
            title: "Error",
            text: err.response.status,
            type: "error"
          })
        })
      }
    },

    //unrelate washing program from the machine
    unrelate: function(program) {
      var self = this
      axios.delete(api + "programs/machine?machineid=" + this.machine.machineId + "&programid=" + program.programId)
      .then(function(response) {
        if(response.status == 200) {
          //update program list
          self.getPrograms(true)
          self.getPrograms(false)

          //notify user
          self.$notify({
            title: "Unrelated the program from the machine",
            type: "success"
          })
        }
      })
      .catch(function(err) {
        self.$notify({
          title: "Error",
          text: err.response.status,
          type: "error"
        })
      })
    },

    //start machine learning cycle
    recordMc: function() {
      var self = this
      //console.log(api + 'programs/' + this.selectedMcProgram.programId + '/machine/' + this.machine.machineId + '/learning/start')
      axios.post(api + 'programs/' + this.selectedMcProgram.programId + '/machine/' + this.machine.machineId + '/learning/start')
      .then( function( response ) {
        if(response.status == 200) {

          //Actualize the state of the machine
          self.actualizeMachine()

          //empty dropdown
          self.selectedMcProgram = ''

          self.$notify({
            title: "Machine Learning started",
            type: "success"
          })
        }
      })
      .catch( function( err ) {

        self.selectedMcProgram = ''

        switch (err.response.status) {
          case 400:
            self.$notify({
              title: "Error 400",
              text: "Invalid parameters provided",
              type: "error"
            })
            break;

          case 409:
            self.$notify({
              title: "Error 409",
              text: 'A learning cycle is already started for this machine or the machine is currently being used',
              type: "error"
            })
            break;

          case 422:
            self.$notify({
              title: "Error 422",
              text: 'Input schema error',
              type: "error"
            })
            break;

          case 500:
            self.$notify({
              title: "Error 500",
              text: 'Internal error',
              type: "error"
            })

          default:
            self.$notify({
              title: "Error " + err.response.status,
              type: "error"
            })
        }
      })
    },

    //Terminates the actual machine learning cycle
    stopLearning: function() {
      var self = this
      axios.post(api + "machines/" + this.machine.machineId + "/learning/stop")
      .then(function(response) {
        if(response.status == 200) {

          //Make actualization of the state of the machine
          self.actualizeMachine()

          //actualizes the recorded cycles
          self.getRecordedCycles()

          self.$notify({
            title: "Recording cycle stopped",
            type: "success"
          })
        }
      })
      .catch(function(err) {
        switch (err.response.status) {
          case 400:
            //actualize the state of the machine
            self.actualizeMachine()

            self.$notify({
              title: "Error " + err.response.status,
              text: "No cycle was being recorded on the specified machine",
              type: "error"
            })
            break;

          case 406:
            //actualize the state of the machine
            self.actualizeMachine()

            self.$notify({
              title: "Error " + err.response.status,
              text: "The recording failed because it was too short",
              type: "error"
            })
            break;

          default:
            self.$notify({
              title: "Error " + err.response.status,
              type: "error"
            })
        }
      })
    }
  }
}

</script>

<style>
.table-scroll {
  overflow-x:auto;
}

.input_as_textfield input {
  box-shadow: none;
  border: none;
  font-size: 16px;
}
</style>
