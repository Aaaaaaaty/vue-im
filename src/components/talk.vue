<template>
  <div id="nav">{{$route.params.username}}</div>
  <div class="content">
    <div v-for="msgObj in CHAT.msgArr" track-by="$index">
      <div  class="talk-space self-talk" 
            v-if="CHAT.msgArr[$index].fromUser == username && CHAT.msgArr[$index].toUser == $route.params.username" 
            track-by="$index">
        <div class="talk-content">
          <div class="talk-word talk-word-self">{{msgObj.msg}}</div><i class="swip"></i>
        </div>
      </div>
      <div  class="talk-space user-talk" 
            v-if="CHAT.msgArr[$index].toUser == username && CHAT.msgArr[$index].fromUser == $route.params.username"
            track-by="$index">
        <div class="talk-content">
          <div class="talk-word talk-word-user">{{msgObj.msg}}<i class="swip-user"></i></div>
        </div>
      </div>
    </div>
  </div>
  <div class="talker">
    <textarea class="talker-input" type="text" v-model="msg" placeholder="Type your message.."></textarea>
    <span class="talker-send iconfont " @click="submit">&#xe605</span> 
  </div>
</template>

<script>
import { getLoginId } from '../vuex/getters'
import io from 'socket.io-client'
import CHAT from '../client'
export default {
  data: function() {
    return {
      msg:'',
      message: [1,2],
      CHAT,
      username: ''
    }
  },
  methods: {
    submit: function(){
      var obj = {
        msg: this.msg,
        toUser: this.$route.params.username,
        fromUser: this.loginId
      }
      this.msg = ''
      CHAT.submit(obj)
      CHAT.scrollToBottom()
    },
    wait: function() {
      CHAT.message(this.loginId)
    }
  },
  ready: function() {
    this.wait()
    this.username = this.loginId
  },
  vuex: {
    getters: {
      loginId: getLoginId
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../utils/utils.scss';
  body {
    // background-color: rgba(243,243,243,1)
  }
  .content {
    .talk-space {
      width: 100%;
      margin-bottom: 16px;
      .talk-word {
        display: inline-block;
        position: relative;
        background: -webkit-linear-gradient(left top, $left-red, $right-red); /* Safari 5.1 - 6.0 */
        color: $white;
        max-width: 60%;
        min-height: 25px;
        line-height: 25px;
        margin: 0 1%;
        padding: 4px 12px 2px 11px;
        border-radius: 5px;
        font-size: 12px;
        word-break: break-all;
      }
      .talk-word-self {
        border-bottom-right-radius: 0px;
        margin-right: 10px;
        text-align: left;
      }
      .talk-word-user {
        background: none;
        background-color: rgba(243,243,243,1);
        color: $black;
        border-bottom-left-radius: 0px;
        margin-left: 10px;
        text-align: right;
      }
      .swip {
        width: 0;
        height: 0;
        border-width: 10px 0px 0px 7px;
        border-style: solid;
        border-color: #da2b65 transparent transparent;
        margin: 40px auto;
        position: absolute;
        bottom: -50px;
        right: 10px;
        z-index: 1;
      }
      .swip-user {
        width: 0;
        height: 0;
        border-width: 10px 8px 0px 0px;
        border-style: solid;
        border-color: rgba(243,243,243,1) transparent transparent;
        margin: 40px auto;
        position: absolute;
        bottom: -50px;
        left: 0px;
        z-index: 1;
      }
    }
    .self-talk {
      margin-top: 10px;
      .talk-img {
        float: right;
        width: auto;
      }
      .talk-content {
        text-align: right;
        position: relative;
      }
    }
    .user-talk {
      margin-top: 10px;
      .talk-img {
        float: left;
        width: auto;
      }
      .talk-content {
        text-align: left;
        position: relative;
      }
    }
  }
  .talker {
    position: fixed;
    z-index: 3;
    bottom: 0;
    width: 100%;
    height: 40px;
    .talker-input {
      position: absolute;
      z-index: 20;
      border: none;
      height: 100%;
      outline: medium;
      width: 97%;
      padding-top: 10px;
      padding-left: 10px;
      padding-right: 10px;
      box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.08);
    }
    .talker-send {
      position: absolute;
      z-index: 30;
      border-radius: 33px;
      width: 16px;
      top: -24px;
      left: 82%;
      padding: 15px;
      text-align: center; 
      font-size: 14px;
      background: -webkit-linear-gradient(left top, $left-red, $right-red);
      color: $white;
      text-decoration: none;
      box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.3);
    }
  }
  .iconfont {
    font-family: "iconfont";
    font-size: 24px;
    font-style: normal;
    position: absolute;
    left: 60%;
    top: 17%;
  }
</style>
