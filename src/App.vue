<template>
  <div>
    <div class="app-logo">
      <img src="./public/img/logo.jpeg" alt="">
    </div>
    <loginform></loginform>
    <loginbutton></loginbutton>
  </div>
</template>

<script>
import loginform from './components/loginform'
import loginbutton from './components/loginbutton'
// import store from './vuex/store'

export default {
  components: {
    loginform,
    loginbutton
  },
  // store
}
</script>
<style lang="scss">
  .app-logo {
    display: block;
    width: 148px;
    margin: 0 auto;
    margin-top: 60px;
    margin-bottom: 20px;
  }
</style>
