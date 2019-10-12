<template>
  <div class="col-md-6 animated fadeIn">
    <div class="block block-rounded text-center">
      <div class="block-content block-content-full">
        <img class="img-avatar" :src="getImage" alt="profile" />
      </div>
      <div class="block-content block-content-full block-content-sm bg-body-light">
        <div class="font-w600 mb-5">{{name}}</div>
        <div class="font-size-sm text-muted">{{email}}</div>
      </div>
      <div class="block-content block-content-full">
        <a class="btn btn-rounded btn-alt-success" href="javascript:void(0)">
          <i class="fas fa-pencil-alt mr-5"></i>Change Password
        </a>
        <a class="btn btn-rounded btn-alt-secondary" href="javascript:void(0)">
          <i class="fas fa-user-circle mr-5"></i>Profile
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email")
    };
  },
  computed: {
    getImage: function() {
      let img = "https://img.icons8.com/clouds/2x/user.png";
      if (localStorage.getItem("image") != "null") {
        img = localStorage.getItem("image");
      }

      return img;
    }
  }
};
</script>

<style>
</style>