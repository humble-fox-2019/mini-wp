<template>
  <nav id="sidebar">
    <!-- Sidebar Content -->
    <div class="sidebar-content">
      <!-- Side Header -->
      <div class="content-header content-header-fullrow px-15">
        <!-- Mini Mode -->
        <div class="content-header-section sidebar-mini-visible-b">
          <!-- Logo -->
          <span class="content-header-item font-w700 font-size-xl float-left animated fadeIn">
            <span class="text-dual-primary-dark">c</span>
            <span class="text-primary">b</span>
          </span>
          <!-- END Logo -->
        </div>
        <!-- END Mini Mode -->

        <!-- Normal Mode -->
        <div class="content-header-section text-center align-parent sidebar-mini-hidden">
          <!-- Close Sidebar, Visible only on mobile screens -->
          <!-- Layout API, functionality initialized in Template._uiApiLayout() -->
          <button
            type="button"
            class="btn btn-circle btn-dual-secondary d-lg-none align-v-r"
            data-toggle="layout"
            data-action="sidebar_close"
          >
            <i class="fas fa-times text-danger"></i>
          </button>
          <!-- END Close Sidebar -->

          <!-- Logo -->
          <div class="content-header-item">
            <a class="link-effect font-w700" href="#">
              <span class="font-size-xl text-dual-primary-dark">Blog</span>
              <span class="font-size-xl text-primary">tive</span>
            </a>
          </div>
          <!-- END Logo -->
        </div>
        <!-- END Normal Mode -->
      </div>
      <!-- END Side Header -->

      <!-- Side User -->
      <div class="content-side content-side-full content-side-user px-10 align-parent">
        <!-- Visible only in mini mode -->
        <div class="sidebar-mini-visible-b align-v animated fadeIn">
          <img class="img-avatar img-avatar32" src="#" alt />
        </div>
        <!-- END Visible only in mini mode -->

        <!-- Visible only in normal mode -->
        <div class="sidebar-mini-hidden-b text-center">
          <a class="img-link" href="#">
            <img class="img-avatar" src="https://img.icons8.com/clouds/2x/user.png" alt />
          </a>
          <ul class="list-inline mt-10">
            <li class="list-inline-item">
              <a
                class="link-effect text-dual-primary-dark font-size-xs font-w600 text-uppercase"
                href="#"
              >J. Smith</a>
            </li>
          </ul>
        </div>
        <!-- END Visible only in normal mode -->
      </div>
      <!-- END Side User -->

      <!-- Side Navigation -->
      <div class="content-side content-side-full">
        <ul class="nav-main">
          <li>
            <a href="#">
              <i class="fas fa-mug-hot"></i>
              <span class="sidebar-mini-hide">Dashboard</span>
            </a>
          </li>
        </ul>
      </div>
      <!-- END Side Navigation -->
    </div>
    <!-- Sidebar Content -->
  </nav>
</template>

<script>
export default {
  data() {
    return {
      name: localStorage.getItem("name"),
      image: localStorage.getItem("image")
    };
  },
  methods: {
    signout() {
      console.log("terpanggil");
    }
  }
};
</script>

<style>
</style>