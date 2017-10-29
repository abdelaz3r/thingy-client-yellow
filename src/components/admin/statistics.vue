<template>
  <div>
    <dashboard :display="true">
      <div slot="title">
        Statistics
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
    }
  }
}
</script>

<style>

</style>
