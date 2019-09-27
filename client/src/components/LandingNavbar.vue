<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item  >
          <router-link class="nav" to="/">Home</router-link>
        </b-nav-item>
        <b-nav-item >
          <router-link class="nav" to="/Login">Login</router-link>
        </b-nav-item>
        <b-nav-item >
          <router-link class="nav" to="/Register">Register</router-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.nav {
  color: #fdfdfe;
}
.navbar-nav .nav-link {
  color: #fdfdfe !important;
}
</style>