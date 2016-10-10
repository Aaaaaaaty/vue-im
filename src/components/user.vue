<template>
  <ul id="footer">
    <li class="footer-nav" 
        id="alivelist" 
        v-link="{path: '/user/alivelist', activeClass: 'active'}" 
        >
      <i class="iconfont" >&#xe600</i>biu
    </li>
    <li class="footer-nav" 
        id="userlist" 
        v-link="{path: '/user/userlist', activeClass: 'active'}"
        >
      <i class="iconfont" >&#xe603</i>通讯录
    </li>
    <li class="footer-nav" 
        id="new" 
        v-link="{path: '/user/new', activeClass: 'active'}"
        >
      <i class="iconfont" id="xe602">&#xe602</i>发现
    </li>
    <li class="footer-nav" 
        id="account" 
        v-link="{path: '/user/account', activeClass: 'active'}"
        >
      <i class="iconfont" >&#xe601</i>我
    </li>
  </ul>

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
  #footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: $white;
    // box-shadow: 0px 0px 15px 2px rgba(218, 43, 101, 0.3);
    .footer-nav {
      display: block;
      position: relative;
      width: 25%;
      padding-top: 30px;
      color: $gray-holder;
      text-align: center;
      font-size: 12px;
      .iconfont {
        font-family: "iconfont";
        font-size: 24px;
        font-style: normal;
        position: absolute;
        left: 38%;
        top: 7%;
      }
      #xe602 {
        font-size: 20px;
        left: 39%;
        top: 12%;
      }
      float: left;
      list-style: none;
    }
    .active {
      color: $right-red;
      border-top: 2px solid;
    }
  }
</style>
