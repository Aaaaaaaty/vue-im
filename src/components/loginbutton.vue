<template>
  <div class="login-content">
    <p class="login">登录</p>
  </div>
</template>

<script>
export default {
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../utils/utils.scss';
  .login-content {
    text-align: center;
    .login {
      display: inline-block;
      border: 1px solid $blue-button-out;
      border-radius: 15px;
      font-size: 14px;
      padding: 2% 30% 2% 30%;
      background-color: $blue-button-out;
      color: $white;
    }
  }
  

</style>
