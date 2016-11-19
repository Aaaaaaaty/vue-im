<template>
  <div id="app">
    <router-view keep-alive></router-view>
  </div>
</template>

<script>
import loginform from './components/loginform'
import confirm from './components/confirm'
import store from './vuex/store'

export default {
  components: {
    loginform,
    // confirm
  },
  store
}
</script>
<style lang="scss">
  
</style>
