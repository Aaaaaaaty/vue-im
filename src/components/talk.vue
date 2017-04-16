<template>
  <div class="talk-contents">
    <div class="talk-inner">
      <div class="talk-nav">
        <!--{{$route.query.username}}-->
        <div class="talk-title">
          {{$route.query.username}}
        </div>
      </div>
      <div class="content">
        <div v-for="msgObj in CHAT.msgArr" track-by="$index">
          <div  class="talk-space self-talk" 
                v-if="CHAT.msgArr[$index].fromUser == username && CHAT.msgArr[$index].toUser == $route.query.username" 
                track-by="$index">
            <div class="talk-content">
              <div class="talk-word talk-word-self">{{msgObj.msg}}</div><i class="swip"></i>
            </div>
          </div>
          <div v-else></div>
          <div  class="talk-space user-talk" 
                v-if="CHAT.msgArr[$index].toUser == username && CHAT.msgArr[$index].fromUser == $route.query.username"
                track-by="$index">
            <div class="talk-content">
              <div class="talk-word talk-word-user">{{msgObj.msg}}<i class="swip-user"></i></div>
            </div>
          </div>
          <div v-else></div>
        </div>
      </div>
      <div class="talker">
        <div class="talker-toolbar">
          <a class="talker-face"></a>
        </div>
        <textarea class="talker-input" type="text" v-model="msg" placeholder="Type your message.."></textarea>
        <div class="action">
          <span class="talker-tip">按下Cmd+Enter换行</span>
          <span class="talker-send" @click="submit">发送</span> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLoginId } from '../vuex/getters'
import { addUserList } from '../vuex/actions'
import vuex from 'vuex'
import io from 'socket.io-client'
import CHAT from '../client'
export default {
  data: function() {
    return {
      msg:'',
      CHAT,
      username: ''
    }
  },
  methods: {
    submit: function(){
      $('.content')[0].scrollTop = 900000000
      var date = new Date()
      var time = date.getHours() + ':' + date.getMinutes()
      var obj = {
        time: time,
        msg: this.msg,
        toUser: this.$route.query.username,
        fromUser: this.loginId
      }
      var user = {
        time: time,
        lastMsg: this.msg,
        username: this.$route.query.username,
        url: this.$route.query.url
      }
      this.addUserList(user)
      this.msg = ''
      CHAT.submit(obj)
    },
  },
  ready: function() {
    this.username = this.loginId
  },
  vuex: {
    getters: {
      loginId: getLoginId
    },
    actions: {
      addUserList: addUserList
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../utils/utils.scss';
  .talk-contents {
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
        line-height: 30px;
        .talk-title {
          position: relative;
          padding: 10px 0;
          margin: 0 19px;
          border-bottom: 1px solid #d6d6d6;
          background-color: $gray-bg;
          z-index: 1024;
        }
      }
      .content {
        background-color: $gray-bg;
        position: absolute;
        bottom: 180px;
        padding: 0 19px;
        margin-left: 280px;
        top: 51px;
        right: 0;
        left: 0;
        overflow: scroll;
      }
      .talker {
        background-color: #eee;
        height: 180px;
        margin-left: 280px;
        padding-right: 19px;
        border-top: 1px solid #d6d6d6;
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        .talker-toolbar {
          height: 30px;
          padding: 5px 17px;
          .talker-face {
            background: url('https://res.wx.qq.com/zh_CN/htmledition/v2/images/icon/sprite@2x308b49.png') 0 -805px;
            width: 30px;
            height: 30px;
            vertical-align: middle;
            display: inline-block;
            background-size: 150px 2489px;
          }
        }
        .talker-input {
          height: 6em;
          width: 100%;
          overflow-y: auto;
          overflow-x: hidden;
          padding-left: 20px;
          outline: 0;
          border: 0;
          font-size: 14px;
          background-color: #eee;
          resize:none;
        }
        .action {
          text-align: right;
          margin-top: 5px;
          .talker-tip {
            color: #888;
            font-size: 12px;
            margin-left: 10px;
            margin-right: 7px;
          }
          .talker-send {
            background-color: #fff;
            color: #222;
            padding: 3px 30px;
            display: inline-block;
            border: 1px solid #c1c1c1;
            border-radius: 4px;
            -moz-border-radius: 4px;
            -webkit-border-radius: 4px;
            font-size: 14px;
            line-height: 1.6;
          }
        }
      }
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
          bottom: -47px;
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
          margin-left: 0px;
        }
      }
    }
    // .talker {
    //   position: fixed;
    //   z-index: 3;
    //   bottom: 0;
    //   // width: 100%;
    //   height: 40px;
    //   .talker-input {
    //     position: absolute;
    //     z-index: 20;
    //     border: none;
    //     height: 100%;
    //     outline: medium;
    //     // width: 97%;
    //     padding-top: 10px;
    //     padding-left: 10px;
    //     padding-right: 10px;
    //     box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.08);
    //   }
      // .talker-send {
      //   position: absolute;
      //   z-index: 30;
      //   border-radius: 33px;
      //   width: 16px;
      //   top: -24px;
      //   left: 82%;
      //   padding: 15px;
      //   text-align: center; 
      //   font-size: 14px;
      //   background: -webkit-linear-gradient(left top, $left-red, $right-red);
      //   color: $white;
      //   text-decoration: none;
      //   box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.3);
      // }
    // }
    // .iconfont {
    //   font-family: "iconfont";
    //   font-size: 24px;
    //   font-style: normal;
    //   position: absolute;
    //   left: 60%;
    //   top: 17%;
    // }
  }
  
</style>
