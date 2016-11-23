<template>
  <div class="user-info">
    <div class="user-name">
      <div class="user-avatar">
        <img v-bind:src='url' class="img"></img>
      </div>
      <div class="user-nickname">
        <span>{{username}}</span>
        <i></i>
      </div>
    </div>
    <div class="user-setting"></div>
    <div class="user-search">
      <input type="text">
    </div>
    <ul id="footer">
      <li class="footer-nav" 
          id="alivelist" 
          v-link="{path: '/user/userlist/noconnect', activeClass: 'active'}" 
          >
        <i class="iconfont" >&#xe600</i>
      </li>
      <li class="footer-nav" 
          id="userlist" 
          v-link="{path: '/user/alivelist/noperson', activeClass: 'active'}"
          >
        <i class="iconfont" id="alivelist" >&#xe603</i>
      </li>
      <!--
      <li class="footer-nav" 
          id="new" 
          v-link="{path: '/user/new', activeClass: 'active'}"
          >
        <i class="iconfont" id="xe602">&#xe602</i>
      </li>
      <li class="footer-nav" 
          id="account" 
          v-link="{path: '/user/account', activeClass: 'active'}"
          >
        <i class="iconfont" >&#xe601</i>
      </li>
      --> 
    </ul>
  </div>
  <router-view keep-alive></router-view>
</template>

<script>
import { getLoginId } from '../vuex/getters'
import settings from '../settings.js'
  export default {
    data: function() {
      return {
        url: '',
        username: ''
      }
    },
    methods: {
    },
    ready: function() {
      this.$http.post(settings.server+'/getUserInfo', { username: this.loginId }).then((res) => {
        let result = res.data.data.user
        this.url = result.url
        console.log(result)
        this.username = result.username
      })
    },
    vuex: {
      getters: {
        loginId: getLoginId
      }
    },
    
  }
</script>

<style lang="scss">
  @import '../utils/utils.scss';
  .user-info {
    position: fixed;
    left: 0;
    background: $background-color;
    width: 280px;
    .user-name {
      color: $white;
      height: 40px;
      padding: 18px;
      background-color: $background-color;
      .user-avatar {
        display: table-cell;
        vertical-align: middle;
        word-wrap: break-word;
        word-break: break-all;
        white-space: nowrap;
        padding-right: 10.625px;
        .user-profile-mini {
          position: absolute;
          z-index: 1024;
          width: 220px;
          background-color: white;
          img {
            width: 220px;
            height: 220px;
            display: block;
          }
          .user-profile-info {
            padding: 20px;
            min-height: 74px;
          }
        }
        .img {
          width: 40px;
          height: 40px;
          background-color: #fff;
          border-radius: 2px;
          -moz-border-radius: 2px;
          -webkit-border-radius: 2px;
          display: inline-block;
          cursor: pointer;
        }
      }
      .user-nickname {
        display: table-cell;
        vertical-align: middle;
        word-wrap: break-word;
        word-break: break-all;
        width: 2000px;
        span {
          display: inline-block;
          font-weight: 400;
          width: 156px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          color: #fff;
          font-size: 18px;
          vertical-align: top;
          line-height: 31px;
          text-decoration: none;
        }
        i {
          background: url(http://res.wx.qq.com/zh_CN/htmledition/v2/images/icon/sprite31b57c.png) 0 -406px;
          width: 30px;
          height: 30px;
          vertical-align: middle;
          display: inline-block;
          cursor: pointer;
        }
      }
    }
    .user-search {
      width: 244px;
      background-color: $background-color;
      margin: 0 auto 6px;
      input {
        width: 214px;
        height: 32px;
        line-height: 32px;
        border: 0;
        border-radius: 2px;
        -webkit-border-radius: 2px;
        background-color: #26292E;
        color: #fff;
        padding-left: 30px;
        font-size: 12px;
      }  
    }
    #footer {
      .footer-nav {
        display: block;
        position: relative;
        color: $gray-holder;
        text-align: center;
        font-size: 12px;
        width: 33%;
        height: 40px;
        float: left;
        .iconfont {
          font-family: "iconfont";
          font-size: 30px;
          font-style: normal;
          position: absolute;
          left: 30%;
        }
        #xe602 {
          font-size: 20px;
          left: 30%;
        }
        list-style: none;
      }
      .active {
        color: $right-red;
      }
    }
    #footer:after {
      content: '';
      display: table;
      clear: both;
    }
  }
  #userlist {
    font-size: 34px;
    top: 1px;
  }
</style>
