<template>
  <div class="w-2/3 h-full flex items-center">
    <div class="flex items-center w-full">
      <div class="w-1/3">
        <button class="focus:outline-none">
          <div class="ml-32">
            <i class="fab fa-wpforms text-4xl inline-block"></i>
            <p class="text-3xl ml-2 inline-block">Mini WP</p>
          </div>
        </button>
      </div>

      <div class="w-2/3 flex justify-center text-gray-600" v-if="isLogin">
        <button class="hover:text-black focus:outline-none" @click="changePage('dashboard')">
          Dashboard
        </button>
        <button class="ml-16 hover:text-black focus:outline-none" @click="changePage('articles')">
          Articles
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '../eventBus'

export default {
  props: ['isLogin'],
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
