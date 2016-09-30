<template>
  <div>
    <div class="app-logo">
      <img src="../public/img/logo.jpeg" alt="">
    </div>
    <div class="input-content">
      <input v-model="user" class="user-input" type="text"  placeholder="用户名">
      <input v-model="psd"  class="user-input" type="password" placeholder="密码">
    </div>
    <div class="login-content">
      <a  class="login"
          @click='login'>
        登录
      </a>
    </div>
  </div>
</template>
<script>
import { userLogin } from '../vuex/actions'
import { isLogin } from '../vuex/getters'
import vuex from 'vuex'
export default {
  data: function(){
    return {
      user: '',
      psd: ''
    }
  },
  methods: {
    login: function() {
      let user = {
        username: this.user,
        password: this.psd,
        friendslist: ['an', 'abc', 'admin'],
      }
      this.$http.post('http://localhost:3000/api/updateUser', user).then((res) => {
        var result = res.body
        console.log(result)
        if(result.status === 'OK') {
          this.$router.go('/user')
        } else {
          alert(result.msg)
        }
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"> 
  @import '../utils/utils.scss';
  .input-content {
    text-align: center;
    margin-bottom: 30px;
    .user-input {
      border: none;
      outline:medium;
      width: 70%;
      border-bottom: 1px solid $blue-line;
      padding-top: 10px;
      padding-bottom: 7px;
    }
    .user-input::-webkit-input-placeholder {
      color:$gray-holder;
      text-align: center;
    }
  }
  .login-content {
    text-align: center;
    .login {
      display: inline-block;
      border: 1px solid $blue-button-in;
      border-radius: 15px;
      font-size: 14px;
      padding: 6px 30% 6px 30%;
      background-color: $blue-button-in;
      color: $white;
      text-decoration: none;
    }
  }
  .app-logo {
    display: block;
    width: 148px;
    margin: 0 auto;
    margin-top: 60px;
    margin-bottom: 20px;
  }
  
</style>
