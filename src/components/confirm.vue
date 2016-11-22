<template>
    <div>
        <div class="user-profile-mini">
            <img class="profile-img" v-bind:src="fileSrc">
            <input type="file" class="user-avatar-input" v-on:change="fileChange">
            <div class="user-profile-info">
            </div>
        </div>
        <div class="confirm-input-content">
          <input v-model="user" class="user-input" type="text"  placeholder="请输入用户名">
          <input v-model="psd"  class="user-input" type="password" placeholder="请输入密码">
          <input v-model="psd_r"  class="user-input" type="password" placeholder="确认密码">
        </div>
        <div class="confirm-login-content">
          <a  class="login"
              @click='login'>
            登录
          </a>
        </div>
    </div>
</template>
<script>
import { userLogin } from '../vuex/actions'
import vuex from 'vuex'
export default {
  data: function(){
    return {
        fileSrc: null
    }
  },
  methods: {
    login: function() {
      //1.匹配两次密码
      //2.请求查重api，看用户名是否重复，重复返回ERROR，无重复返回状态OK
      //3.判断返回状态，ERROR打印到客户端，OK则向服务器发起鉴权请求，返回签名
      //4.拼接签名为tencent服务器请求url，发起请求，上传成功则返回可下载download_url
      //5.将download_url放进user对象，向服务器发起addUser的post请求，按照返回结果渲染
      let user = {
        username: this.user,
        password: this.psd,
        password_r: this.psd_r
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
    fileChange: function() {
        var file = document.querySelector('.user-avatar-input')
        var oFReader = new FileReader()
        var rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
        var self = this
        if(file.files.length === 0) {
            return null
        } else {
            if (!rFilter.test(file.files[0].type)) { 
                alert("You must select a valid image file!") 
                return null 
            }
            oFReader.readAsDataURL(file.files[0])
        }
        oFReader.onload = function (oFREvent) {
            self.fileSrc = oFREvent.target.result
            document.querySelector('.profile-img').style.background = "none"
        }
        

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
    }
  }
}
</script>
<style lang="scss"> 
    @import '../utils/utils.scss';
    .user-profile-mini {
        text-align: center;
        position: relative;
        margin: 40px;
        .profile-img {
            width: 150px;
            height: 150px;
            background: url('../public/img/touxiang.jpeg');
            background-size: cover;
        }
        .user-avatar-input {
            width: 150px;
            height: 150px;
            position: absolute;
            left: 39%;
            opacity: 0;
            cursor: pointer;
        }
    }
    .confirm-input-content {
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
    .confirm-login-content {
        text-align: center;
        .login {
            display: inline-block;
            border: 1px solid $right-red;
            border-radius: 15px;
            font-size: 14px;
            padding: 6px 30% 6px 30%;
            background: -webkit-linear-gradient(left top, $left-red, $right-red);
            color: $white;
            text-decoration: none;
            vertical-align:middle
        }
    }
</style>