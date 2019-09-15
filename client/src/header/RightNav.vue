<template>
  <div class="w-1/3 h-full flex items-center justify-center">
  
    <div>
      <button
        class="mr-20 px-5 py-2 font-bold focus:outline-none"
        @click="changePage('login-page')"
      >
        Log in
      </button>
    </div>

    <div>
      <button
        class="px-5 py-2 font-bold rounded text-white bg-purple-600 focus:outline-none"
        @click="changePage('signup-page')"
      >
        Sign up
      </button>
    </div>
    
  </div>
</template>

<script>
import EventBus from '../eventBus'

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
