<template>
  <div id="nav">{{viewName}}</div>
  <ul id="footer">
    <li v-bind:class="footerNav" id="alivelist" @click="link">
      <i class="iconfont" >&#xe600</i>biu
    </li>
    <li v-bind:class="footerNav" id="userlit" @click="link">
      <i class="iconfont" >&#xe603</i>通讯录
    </li>
    <li v-bind:class="footerNav" id="find" @click="link">
      <i class="iconfont" id="xe602">&#xe602</i>发现
    </li>
    <li v-bind:class="footerNav" id="account" @click="link">
      <i class="iconfont" >&#xe601</i>我
    </li>
  </ul>

  <router-view></router-view>
</template>

<script>
  export default {
    data: function() {
      return {
        viewName: 'biubiu',
        footerNav: 'footer-nav',
        isActive: false,
        active: true
      }
    },
    methods: {
      link: function(e) {
        switch(e.currentTarget.id)
        {
          case 'alivelist':
            this.$router.go('/user/')
            break
          case 'userlit':
            console.log(e.currentTarget.id)
            this.$router.go('/user/userlist')
            break
          case 'find':
            this.$router.go('/user/new')
            break
          case 'account':
            this.$router.go('/user/account')
        }
        
      }
    },
    created: function() {
      console.log(document.location)
    }
  }
</script>

<style lang="scss">
  @import '../utils/utils.scss';
  #nav {
    text-align: center;
  }
  #footer {
    position: fixed;
    bottom: 0px;
    width: 100%;
    background-color: $gray-bg;
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
      color: $blue-icon;
    }
  }
</style>
