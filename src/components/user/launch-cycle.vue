<template>
  <div>
    <dashboard :display="display">
      <div slot="title">
        Title
      </div>
      <slot>
        Content
      </slot>
    </dashboard>
  </div>
</template>

<script>

export default {
  data: function() {
    return {
      display: false
    }
  }
}

</script>

<style>

</style>
