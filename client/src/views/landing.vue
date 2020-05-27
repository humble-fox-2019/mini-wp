<template>
  <section id="landing-page">
    <div>
      <img src="../static/Background.png" alt />
      <h5 class="mt-1 mb-3">Create and manage your blog for free.</h5>
      <button @click.prevent="goLogin" class="btn btn-primary">
        Let's Get Started
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    goLogin() {
        this.$emit('goLogin')
    }
  }
};
</script>

<style>
#landing-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  text-align: center;
}
</style>