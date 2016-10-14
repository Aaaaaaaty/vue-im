<template>
  <div class="user-info">
    <div class="user-name">An</div>
    <div class="user-setting"></div>
    <div class="user-search">
      <input type="text">
    </div>
    <ul id="footer">
      <li class="footer-nav" 
          id="alivelist" 
          v-link="{path: '/user/alivelist', activeClass: 'active'}" 
          >
        <i class="iconfont" >&#xe600</i>
      </li>
      <li class="footer-nav" 
          id="userlist" 
          v-link="{path: '/user/userlist', activeClass: 'active'}"
          >
        <i class="iconfont" id="userlist" >&#xe603</i>
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
  export default {
    data: function() {
      return {
      }
    },
    methods: {
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
