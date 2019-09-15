<template>
  <div class="vld-parent">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  props: ['isLoading', 'fullPage'],
  // data() {
  //   return {
  //     isLoading: false,
  //     fullPage: true
  //   }
  // },
  components: {
    Loading
  },
  methods: {
    onCancel() {
      console.log('User cancelled the loader.')
    }
  }
}
</script>

<style></style>
