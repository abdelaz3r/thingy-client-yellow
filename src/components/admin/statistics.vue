<template>
  <div>
    <dashboard :display="true">
      <div slot="title">
        Statistics of <p style="font-weight: bold; display: inline"> {{machine.name}}</p>
        with MAC <p style="font-weight: bold; display: inline;">{{machine.mac}}</p>
      </div>
      Actual Mac:
    </dashboard>
  </div>
</template>

<script>
export default {
  props: ['machine'],
  data: function() {
    return {

    }
  },
  methods: {

  },
  mounted() {
  }
}
</script>

<style>

</style>
