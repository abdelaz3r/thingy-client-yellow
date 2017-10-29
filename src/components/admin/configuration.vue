<template>
  <div>
    <dashboard :display="display">
      <div slot="title">
        Configuration
      </div>
      Actual Mac: {{mac}}
    </dashboard>
  </div>
</template>

<script>
  export default {
    props: ["mac"],
    data: function() {
      return {
        display: true
      }
    }
  }
</script>

<style>

</style>
