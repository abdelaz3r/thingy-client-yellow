<template>
  <div>
    <dashboard :display="true">
      <div slot="title">
        User Settings
      </div>
    </dashboard>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  mounted () {
    this.getAllUsers()
  },
  methods: {
    getAllUsers: function() {
      var self = this

      axios.get(api + 'user/11').then(function(response) {
        self.user = response.data
        console.log(self.user)
      }).catch(function(err) {
        console.log(err)
      })
    }
  }
}
</script>