<template>
  <div>
    <!--Navbar on top-->
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark" id="navbarTop">
      <!--Think Tank branding on the lift, when clicked, user is taken to the homepage-->
      <a class="navbar-brand" href="#" @click.prevent="checkLogin()">
        <i class="fab fa-wordpress"></i> Think Tank
      </a>

      <!--This button is the stacked toggle nav button which appears when screen size is super small, in order to hide and show navigation in that small screen-->
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!--This is where the actual navigation links are being listed-->
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="showWriteArticle()">Create post</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Drafts</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="showDashboard()">View post</a>
          </li>
        </ul>
      </div>

      <!--This is the search form within the navigation-->
      <form class="form-inline" id="searchBar">
        <input class="form-control mr-sm-2" type="text" placeholder="Search" v-model="searchInput" />
        <button class="btn btn-success" type="submit" @click.prevent="searchArticle()">Search</button>
      </form>

      <button
        type="button"
        class="btn btn-outline-light my-2 my-lg-0 mx-2"
        @click.prevent="logout()"
      >Logout</button>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>