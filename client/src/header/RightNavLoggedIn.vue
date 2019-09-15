<template>
  <div class="w-1/3 h-full flex items-center justify-end">
    <div>
      <button class="mr-20 px-5 py-2 font-bold focus:outline-none text-red-600" @click="logout">
        Log out
      </button>
    </div>
  </div>
</template>

<script>
import EventBus from '../eventBus'

export default {
  methods: {
    logout() {
      EventBus.$emit('logout')
      EventBus.$emit('changePage', { page: 'login-page' })
    }
  }
}
</script>

<style></style>
