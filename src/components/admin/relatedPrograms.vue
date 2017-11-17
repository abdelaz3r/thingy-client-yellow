<template>
  <div>
    <dashboard :display="true">
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
                    <option v-for="program in allPrograms" :value="program" :selected="true">{{ program.cyclename }}</option>
                  </select>
                </div>
              </td>
              <td>
                <button class="button is-success" @click="add">{{ selectedProgram.cyclename == null ? 'Select a program to relate to the machine' : 'Relate ' + selectedProgram.cyclename + ' to the machine'}}</button>
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
                <button class="button is-danger" @click="del(relatedProgram)">delete</button>
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
      machine: '',
      relatedPrograms: [],
      allPrograms: [],
      selectedProgram: ''
    }
  },
  mounted() {
    //get and set the groundlaying data
    this.getMachine()
    this.getPrograms(false)
    this.getPrograms(true)
  },
  methods: {

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

        //only show programs which can still added to the machine
        self.allPrograms = self.diffPrograms(self.allPrograms, self.relatedPrograms)
      })
      .catch(function(err) {
        self.$notify({
          title: "Error getting the program list",
          text: err.response.status,
          type: "error"
        })
      })
    },

    //relate program to machine
    add: function() {
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

    //unrelate program from the machine
    del: function(program) {
      console.log("machine id: " + this.machine.machineId + " programid: " + program.programId)
      var self = this
      axios.delete(api + "programs/machine", {
        programid: program.programId,
        machineid: this.machine.machineId
      })
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
