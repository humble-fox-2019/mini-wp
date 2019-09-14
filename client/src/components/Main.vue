<template>
  <main id="main-container">
    <!-- Page Content -->
    <div class="content">
      <div class="block">
        <div class="block-content">
          <p class="text-center py-100">...</p>
        </div>
      </div>
      <div class="block">
        <div class="block-content">
          <p class="text-center py-100">...</p>
        </div>
      </div>
      <div class="block">
        <div class="block-content">
          <p class="text-center py-100">...</p>
        </div>
      </div>
      <div class="block">
        <div class="block-content">
          <p class="text-center py-100">...</p>
        </div>
      </div>
      <!-- END Dummy content -->
    </div>
    <!-- END Page Content -->
  </main>
</template>

<script>
export default {
  props: ["page"],
  data() {
    return {};
  },
  methods: {
    changePage(page) {
      this.$emit("changepage", page);
    }
  },
  components: {}
};
</script>

<style>
</style>