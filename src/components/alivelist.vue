<template>
  <div class="alive-list">
    <div class="alive-content">
      <div class="alive-item" track-by="$index" v-for="alive in aliveList" @click="startTalk">
        <div class="alive-img"></div>
        <div class="alive-name">
          {{alive}}
        </div>
      </div>
    </div>
  </div>
  <router-view keep-alive></router-view>
</template>

<script>
import { getLoginId } from '../vuex/getters'
import settings from '../settings.js'
import CHAT from '../client'
  export default {
    data: function() {
      return {
        aliveList: ['an', 'admin', 'zks', 'ltn', 'cc', 'lby', 'yhr', 'zxx', 'jg', 'adc', 'sup','an', 'admin', 'zks', 'ltn', 'cc', 'lby', 'yhr', 'zxx', 'jg', 'adc', 'sup']
      }
    },
    methods: {
      startTalk: function(e) {
      //   var text = e.target.innerText
      //   CHAT.init(this.loginId)
        this.$router.go({
          path: '/user/alivelist/info'
        })
      },
    },
    ready: function() { 
      this.$http.post(settings.server+'/getUser', { username: this.loginId }).then((res) => {
        var userList = res.body
        this.userList = userList.data.user.friendslist
      })
    },
    router:{
      canReuse: true
    },
    vuex: {
      getters: {
        loginId: getLoginId
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../utils/utils.scss';
  .alive-list {
    // display: block;
    position: absolute;
    top: 154px;
    right: 0;
    bottom: 0;
    left: 0;
    width: 280px;
    background-color: $background-color;
    overflow-y: scroll;
    .alive-content {
      height: 100%;
      .alive-item {
        overflow: hidden;
        padding: 10px 18px 9px;
        border-bottom: 1px solid #292C33;
        cursor: pointer;
        position: relative;
        color: $white;
        .alive-img {
          float: left;
          margin-right: 10px;
          position: relative;
          width: 40px;
          height: 40px;
          background-color: $gray;
        }
        .alive-name {
          overflow: hidden;
          font-weight: 400;
          font-size: 13px;
          color: #FFF;
          line-height: 20px;
        }
      }
    }
  }
  .alive-list::-webkit-scrollbar {
    width:0px
  }
  
</style>
