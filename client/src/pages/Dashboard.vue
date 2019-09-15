<template>
  <div class="w-full">
    <div class="mx-16 mt-10">
      <h1 class="text-3xl font-bold">Welcome to Mini WP!</h1>
      <button class="focus:outline-none" @click="changePage('new-article')">New Article</button>
    </div>
  </div>
</template>

<script>
import EventBus from '../eventBus'
import axios from 'axios'

export default {
  methods: {
    changePage(page) {
      const payload = {
        page
      }

      EventBus.$emit('changePage', payload)
    }
  }
}
</script>

<style></style>
