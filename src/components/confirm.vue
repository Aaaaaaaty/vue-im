<template>
	<div>
		<div class="user-profile-mini">
			<img class="profile-img" src="http://vueim-10073389.image.myqcloud.com//u/can/use/slash/sample1479377386" alt="">
			<div class="user-profile-info">
				<span>An</span>
			    <i>点击图片更换头像</i><input type="file" class="user-avatar-input">
			</div>
		</div>
		<div class="confirm-input-content">
	      <input v-model="user" class="user-input" type="text"  placeholder="用户名">
	      <input v-model="psd"  class="user-input" type="password" placeholder="密码">
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
		.profile-img {
			width: 100px;
			height: 100px;
			background-color: $white;
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