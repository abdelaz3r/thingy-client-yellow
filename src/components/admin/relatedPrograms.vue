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
                <input class="input" v-model="addName">
              </td>
              <td>
                <button class="button is-success" @click="add">Add</button>
              </td>
            </tr>
            <tr class="input_as_textfield" v-for="program in programs">
              <td>
                <input class="input" v-model="program.cyclename"
                @blur="update(program)"
                @keyup.enter="update(program)">
              </td>
              <td>
                <button class="button is-danger" @click="del(program)">delete</button>
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
      machine: this.$route.params.machine,
      programs: [],
      addName: ''
    }
  },
  mounted() {
    this.getPrograms()
  },
  methods: {
    //list all programs
    getPrograms: function() {
      var self = this;
      axios.get(api + "programs")
      .then(function(response) {
        self.programs = response.data
      })
      .catch(function(err) {
        self.$notify({
          title: "Error getting the program list",
          text: err.response.status,
          type: "error"
        })
      })
    },

    update: function(program) {
      var self = this
      axios.put(api + "programs/" + program.programId, {
        cyclename: program.cyclename
      })
      .then(function(response){
        if(response.status == 200) {

          //update list
          self.getPrograms()

          self.$notify({
            title: "Updated Program",
            type: "success"
          })
        }
      })
      .catch(function(err) {
        self.$notifY({
          title: "Error",
          text: err.response.status,
          type: "error"
        })
      })
    },

    add: function() {
      var self = this
      axios.post(api + "programs", {
        cyclename: this.addName
      })
      .then(function(response) {
        if(response.status == 200){

          //update program list
          self.getPrograms()

          //delete input from form
          self.addName = ''

          self.$notify({
            title: "Program added",
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

    del: function(program) {
      var self = this
      axios.delete(api + "programs/" + program.programId)
      .then(function(response) {
        if(response.status == 200) {
          //update program list
          self.getPrograms()

          //notify user
          self.$notify({
            title: "Deleted Program",
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
