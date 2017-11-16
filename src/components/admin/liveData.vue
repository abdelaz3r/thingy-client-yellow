<template>

  <dashboard :display="true">
    <div slot="title">
      Live Data of machine <p style="font-weight: bold; display: inline;">{{machine.name}}</p>
    </div>

    <div class="div-break">
      <br>
      Humidity: {{machine.live.sensors.humidity}}
      <br>
      Temperature: {{machine.live.sensors.temperature}}
      <br>
      State: {{state}}
    </div>

  </dashboard>

</template>

<script>

export default {
  data: function() {
    return {
      machine: this.$route.params.machine,
      state: null
    }
  },
  mounted() {
    if(this.machine.live.cycle == null) {
      this.state = "No state available at the moment"
    }
    else {
      this.state = this.machine.live.cycle.state
    }
  }
}

</script>

<style>
.div-break {
  display: block;
}
</style>
