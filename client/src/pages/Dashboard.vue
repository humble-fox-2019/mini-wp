<template>
  <div class="w-full">
    <div class="mx-16 mt-10">
      <h1 class="text-5xl font-bold bg-black text-white pl-5 mb-5 tracking-wide">Welcome to Mini WP!</h1>
      <p class="mb-5">
        Here's a Content Management System to make your life easier and hopefully happier. We'are
        kindly enough to assembled some links, incase you didn't saw that <span class="font-bold">BIG</span> navbar.
      </p>
      <ul>
        <li>
          <a
            class="focus:outline-none underline"
            @click.prevent="changePage('new-article')"
            href="#"
            >Create a new article</a
          >
        </li>
        <li>
          <a class="focus:outline-none underline" @click.prevent="changePage('articles')" href="#"
            >Your pile of awesomeness</a
          >
        </li>
      </ul>
      <div class="w-full flex justify-center mt-5">
        <img class=" w-1/2" src="../../resources/undraw_animating_1rgh.svg" alt="" />
      </div>
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
