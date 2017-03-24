<template>
  <div class="talk-content">
    <div class="talk-inner">
      <div class="talk-nav">
        <div class="talk-title">
          <span>详细信息</span>
        </div>
      </div>
      <div class="content">
        <div class="avatar">
          <img v-bind:src="$route.query.url"></img>    
        </div>
        <div class="profile-name">
          <h4>{{$route.query.username}}</h4>
        </div>
        <p class="profile-text"></p>
        <div class="profile-meta"></div>
        <div class="profile-submit">
          <a class="button" @click="submit">发消息</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addUserList } from '../vuex/actions'
import vuex from 'vuex'
export default {
  data: function() {
    return {}
  },
  methods: {
    submit: function(e){
      e.preventDefault()
      var user = {
        time: '',
        lastMsg: '',
        username: this.$route.query.username,
        url: this.$route.query.url
      }
      this.addUserList(user)
      this.$router.go({
          path: '/user/userlist/talk/',
          query: {
                  username: this.$route.query.username,
                  url: this.$route.query.url
                }
      })
    },
  },
  vuex: {
    actions: {
      addUserList: addUserList
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../utils/utils.scss';
  .talk-content {
    height: 100%;
    margin-left: 280px;
    .talk-inner {
      .talk-nav {
        background-color: $gray-bg;
        margin-left: 280px;
        text-align: center;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        .talk-title {
          position: relative;
          line-height: 30px;
          height: 30px;
          padding: 10px 0;
          margin: 0 19px;
          border-bottom: 1px solid #d6d6d6;
          background-color: $gray-bg;
          z-index: 1024;
            span {
              height: 25px;
              font-size: 14px;
              font-weight: 400;
            }
        }
      }
      .content {
        background-color: $gray-bg;
        position: absolute;
        bottom: 0px;
        padding: 0 19px;
        margin-left: 280px;
        top: 51px;
        right: 0;
        left: 0;
        text-align: center;
        padding-top: 80px;
        color: #ccc;
        font-size: 13px;
        .avatar {
          margin-bottom: 20px;
          img {
            display: block;
            width: 100px;
            height: 100px;
            margin: 0 auto;
            border-radius: 4px;
            -moz-border-radius: 4px;
            -webkit-border-radius: 4px;
            background-color: white;
          }
        }
        .profile-name {
          h4 {
            font-weight: 400;
            font-size: 24px;
            margin-bottom: 10px;
            display: inline-block;
            color: black;
          }
        }
        .profile-text {
          font-size: 14px;
          color: #888;
        }
        .profile-submit {
          .button{
            display: inline-block;
            margin-top: 40px;
            width: 200px;
            text-align: center;
            color: #fff;
            line-height: 40px;
            background-color: #42AC3E;
            font-size: 14px;
            text-decoration: none;
            border-radius: 4px;
            -moz-border-radius: 4px;
            -webkit-border-radius: 4px;
          }
        }
      }
    }
  }
  
</style>
