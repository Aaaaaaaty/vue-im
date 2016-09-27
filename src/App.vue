<template>
  <div>
    <Hello></Hello>
    <How></How>
  </div>
</template>

<script>
import Hello from './components/Hello'
import How from './components/How'
import store from './vuex/store'

export default {
  components: {
    Hello,
    How
  },
  store
}
</script>

<style>
</style>
