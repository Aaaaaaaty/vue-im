<template>
    <form v-bind:action="url" method="post" enctype="multipart/form-data" id="uploadForm">
        <div class="user-profile-mini">
            <img class="profile-img" v-bind:src="fileSrc">
            <input type="file" class="user-avatar-input" v-on:change="fileChange" name="FileContent">
            <div class="user-profile-info">
            </div>
        </div>
        <input type="submit" class="user-profile-btn" v-bind:value="submitStatus">
    </form>
        <div class="confirm-input-content">
          <input v-model="user" class="user-input" type="text"  placeholder="请输入用户名">
          <input v-model="psd"  class="user-input" type="password" placeholder="请输入密码">
          <input v-model="psd_r"  class="user-input" type="password" placeholder="确认密码">
        </div>
        <div class="confirm-login-content">
          <a class="login" @click='login'>
            注册
          </a>
        </div>
    
</template>
<script>
import { userLogin } from '../vuex/actions'
import settings from '../settings.js'
import vuex from 'vuex'
export default {
  data: function(){
    return {
        fileSrc: null,
        user: '',
        psd: '',
        psd_r: '',
        url: '',
        download_url: null,
        submitStatus:'点击提交'
    }
  },
  methods: {
    login: function() {
      //1.匹配两次密码
      //2.向服务器发起鉴权请求，返回签名
      //3.拼接签名请求url，发起请求，上传成功则返回可下载download_url
      //4.将download_url放进user对象，向服务器发起addUser的post请求，按照返回结果渲染
      
      if(this.psd !== this.psd_r || !this.psd || !this.psd_r || !this.user) {
        alert('填写信息有误')
      } else if(!this.download_url) {
        alert('请上传头像')
      } else {
        console.log(this.user)
        var user = {
          username: this.user,
          password: this.psd,
          password_r: this.psd_r,
          url: this.download_url
        }
        this.$http.post(settings.server + '/addUser', user).then((res) => {
          var result = res.body
          if(result.status === 'OK') {
            this.$router.go('/')
          } else {
            alert(result.msg)
          }
        })
      }
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
    this.$http.get('http://123.206.95.98:9002/node/').then((data) => {
      let sign = data.body.sign
      let url = data.body.url + '?sign=' + encodeURIComponent(sign);
      this.url = url
      var options = { 
          type: 'post',
          url: url,
          dataType: 'json',
          contentType:"multipart/form-data",
          success:(ret) => { 
            this.download_url = ret.data.download_url
            this.submitStatus = '提交成功'
            $('.user-profile-btn').attr({'disabled':'disabled'}).css({'cursor':'none'})
          },
          error:(ret) => {
            console.log(ret.responseText)
          }
      }; 
        // pass options to ajaxForm 
        $('#uploadForm').ajaxForm(options)
    })
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
        margin: 40px 0px 10px 0px;
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
    .user-profile-btn {
      display: block;
      margin: 0 auto;
      cursor: pointer;
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