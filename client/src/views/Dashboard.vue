<template>
  <div class="dashboard">
    <div class="side-bar">
      <div class="logo">
        <img src="@/assets/logo-white.png" alt="" srcset="">
      </div>
      <div class="menu">
        <h2>Menu</h2>
        <router-link to="/dashboard">My Articles</router-link>
        <router-link to="/dashboard/new-article">Add new article</router-link>
      </div>
    </div>
      <div class="content">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>