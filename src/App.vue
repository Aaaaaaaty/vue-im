<template>
  <div id="app">
    <router-view keep-alive></router-view>
  </div>
</template>

<script>
import loginform from './components/loginform'
import store from './vuex/store'

export default {
  components: {
    loginform,
  },
  store
}
</script>
<style lang="scss">
  
</style>
