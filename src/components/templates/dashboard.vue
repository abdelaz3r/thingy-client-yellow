<template>
  <div>
    <button class="button is-middle" v-if="display" v-on:click="back">
      < Back
    </button>
    <nav class="panel">
      <div class="panel-heading">
        <slot name="title"></slot>
      </div>
      <div class="panel-block">
        <slot></slot>
      </div>
    </nav>
  </div>
</template>

<script>

module.exports = {
  props: ["display"],
  methods: {
    back: function() {
      this.$router.go(-1)
    }
  },
  mounted() {
    //this.notify("Testmessage")
  }
}

</script>

<style>

</style>
