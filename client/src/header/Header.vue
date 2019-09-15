<template>
  <div>
    <header class="h-24 flex">
      <LeftNav :isLogin="isLogin"></LeftNav>
      <RightNav v-if="!isLogin"></RightNav>
      <RightNavLoggedIn v-if="isLogin"></RightNavLoggedIn>
    </header>
  </div>
</template>

<script>
import LeftNav from './LeftNav'
import RightNav from './RightNav'
import RightNavLoggedIn from './RightNavLoggedIn'

export default {
  components: {
    LeftNav,
    RightNav,
    RightNavLoggedIn
  },
  props: ['isLogin']
}
</script>

<style></style>
