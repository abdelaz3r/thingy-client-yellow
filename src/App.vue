<template>
  <div id="app">
    <div class="container">
      <div class="level top-bar">
        <div class="lefel-left">
          <div class="level-item">
            <a href="/" class="subtitle is-4">
              @ Smart Loundry
            </a>
          </div>
        </div>
        <div class="lefel-right">
          <div class="level-item">
            <a href="/login" class="button">My Account</a>
          </div>
        </div>
      </div>

<router-view/>

    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@import "../node_modules/bulma/css/bulma.css";

.top-bar {
  margin-top: 10px;
}
</style>
