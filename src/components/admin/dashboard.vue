<template>
  <div>
    <nav class="panel">
      <p class="panel-heading subtitle is-2">
        Admin Dashboard
      </p>
      <div class="panel-block">
      <div class="column">
        <a href="#/admin/users">
          <div class="notification is-warning subtitle is-3">
            Users
          </div>
        </a>
      </div>
      <div class="column">
        <div class="notification is-primary subtitle is-3">Machines</div>
      </div>
      <div class="column">
        <div class="notification is-success subtitle is-3">Statistics</div>
      </div>
      <div class="column">
        <div class="notification is-danger subtitle is-3">Innvoices</div>
      </div>
  </div>
  </nav>
  </div>
</template>

<script>

</script>

<style>

.notification {
  text-align: center;
}

.notification.is-warning {
  color: white;
}

.panel {
  padding-top: 10vh;
}

</style>
