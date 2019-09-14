<template>
  <header id="page-header">
    <!-- Header Content -->
    <div class="content-header">
      <!-- Left Section -->
      <div class="content-header-section">
        <!-- Toggle Sidebar -->
        <!-- Layout API, functionality initialized in Template._uiApiLayout() -->
        <button
          type="button"
          class="btn btn-circle btn-dual-secondary"
          data-toggle="layout"
          data-action="sidebar_toggle"
        >
          <i class="fas fa-navicon"></i>
        </button>
        <!-- END Toggle Sidebar -->
      </div>
      <!-- END Left Section -->

      <!-- Right Section -->
      <div class="content-header-section">
        <span
          style="cursor: pointer;"
          class="d-none d-sm-inline-block font-weight-bold"
          @click="$emit('changepage', 'ArticleAdd')"
        >
          <i class="fas fa-plus"></i> Add new article
        </span>

        <!-- User Dropdown -->
        <div class="btn-group" role="group">
          <button
            type="button"
            class="btn btn-rounded btn-dual-secondary"
            id="page-header-user-dropdown"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-user d-sm-none"></i>
            <span class="d-none d-sm-inline-block">{{name}}</span>
            <i class="fas fa-angle-down ml-5"></i>
          </button>
          <div
            class="dropdown-menu dropdown-menu-right min-width-200"
            aria-labelledby="page-header-user-dropdown"
          >
            <h5 class="h6 text-center py-10 mb-5 border-b text-uppercase">User</h5>
            <a class="dropdown-item" href="#" @click="$emit('changepage', 'Profile')">
              <i class="fas fa-user mr-5"></i> Profile
            </a>

            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">
              <i class="fas fa-sign-out-alt mr-5"></i> Sign Out
            </a>
          </div>
        </div>
        <!-- END User Dropdown -->
      </div>
      <!-- END Right Section -->
    </div>
    <!-- END Header Content -->
  </header>
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