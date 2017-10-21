<template>

  <div>
    <dashboard :display="display">
      <div slot="title">
        Manage Machines
      </div>
      <slot>
        
      </slot>
    </dashboard>
  </div>

</template>

<script>
import dashboard from '../templates/dashboard'

export default {
  components: {
    dashboard
  },
  data: function() {
    return {
      display: true
    }
  }
}

</script>

<style>


</style>
