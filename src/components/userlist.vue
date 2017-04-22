<template>
  <div class="user-list">
    <div class="user-content">
      <div  class="user-item" 
            track-by="$index" 
            v-for="user in userList" 
            @click="startTalk"
            >
        <img class="user-img" v-bind:src="user.url">
        </img>
        <div class="user-name">
          <span class="user-user">{{user.username}}</span>
          <p class="user-ext">{{user.time}}</p>
          <p class="user-msg">{{user.lastMsg}}</p>
        </div>
      </div>
    </div>
  </div>
  <router-view keep-alive></router-view>
</template>

<script>
import { getLoginId, addUserList } from '../vuex/getters'
import settings from '../settings.js'
import CHAT from '../client'
  export default {
    data: function() {
      return {
        userList: [],
      }
    },
    methods: {
      startTalk: function(e) {
        var text = e.currentTarget
        var userName = text.querySelector('.user-user').innerHTML
        this.$router.go({
          path: '/user/userlist/talk/',
          query: {username: userName}
        })
      },
    },
    ready: function() { 
      CHAT.msgArr.forEach((item, index) => {
        let userlist = this.addUserList
        userlist.forEach((obj, index) => {
          if(obj.username == item.fromuser ) {
            console.log(item.msg)
          }
        })
      })
      this.userList = this.addUserList
    },
    router:{
      canReuse: true
    },
    vuex: {
      getters: {
        loginId: getLoginId,
        addUserList: addUserList
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../utils/utils.scss';
  .user-list {
    // display: block;
    position: absolute;
    top: 154px;
    right: 0;
    bottom: 0;
    left: 0;
    width: 280px;
    background-color: $background-color;
    overflow-y: scroll;
    .user-content {
      height: 100%;
      .active {
        background: #3A3F45;
      }
      .user-item {
        overflow: hidden;
        padding: 12px 18px 11px;
        border-bottom: 1px solid #292C33;
        cursor: pointer;
        position: relative;
        color: $white;
        .user-img {
          float: left;
          margin-right: 10px;
          position: relative;
          width: 40px;
          height: 40px;
          // background-color: $gray;
        }
        .user-name {
          overflow: hidden;
          font-weight: 400;
          font-size: 13px;
          color: #FFF;
          line-height: 20px;
          .user-ext {
            float: right;
            color: $white;
            font-size: 13px;
            text-align: right;
            height: 19px;
            line-height: 1.5;
          }
          .user-msg {
            font-size: 12px;
            color: gray;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
            height: 1.5em;
          }
        }
      }
    }
  }
  .user-list::-webkit-scrollbar {
    width:0px
  }
  
</style>
