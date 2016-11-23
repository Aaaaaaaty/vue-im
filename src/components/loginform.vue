<template>
  <div>
    <div class="app-logo">
      <img src="../public/img/logo.png" alt="">
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
    <span class="app-confirm" @click='confirm'>注册</span>
  </div>
</template>
<script>
import { userLogin } from '../vuex/actions'
import vuex from 'vuex'
import CHAT from '../client'
import settings from '../settings.js'
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
        password: this.psd
      }
      this.$http.post(settings.server+'/login', user).then((res) => {
        var result = res.body
        var username = result.data.user.username
        if(result.status === 'OK') {
          this.userLogin(username)
          CHAT.init(username)
          this.$router.go('/user/userlist/noconnect')
        } else {
          alert(result.msg)
        }
      })
    },
    confirm: function() {
      this.$router.go('/confirm')
    }
  },
  ready: function() {
    document.onkeydown = (e) => {
      if(e && e.keyCode == 13) {
        this.login()
      }
    }
  },
  vuex: {
    actions: {
      userLogin: userLogin
    }
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
      text-align: center;
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
      // border: 1px solid $right-red;
      border-radius: 15px;
      font-size: 14px;
      padding: 6px 30% 6px 30%;
      background: -webkit-linear-gradient(left top, $left-red, $right-red);
      color: $white;
      text-decoration: none;
      vertical-align:middle
    }
  }
  .app-logo {
    display: block;
    width: 148px;
    margin: 0 auto;
    margin-top: 60px;
    margin-bottom: 20px;
  }
  .app-confirm {
    display: block;
    position: relative;
    text-align: center;
    font-size: 12px;
    color: $red;
    cursor: pointer;
  }
  
</style>
