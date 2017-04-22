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
              <div class="talk-word talk-word-self">{{ msgObj.msg }}</div><i class="swip"></i>
            </div>
          </div>
          <div v-else></div>
          <div  class="talk-space user-talk" 
                v-if="CHAT.msgArr[$index].toUser == username && CHAT.msgArr[$index].fromUser == $route.query.username" 
                track-by="$index">
            <div class="talk-content">
              <div v-if="CHAT.msgArr[$index].fromUser =='群聊'" class="talk-all">{{ msgObj.trueFrom }}</div>
              <div class="talk-word talk-word-user">
                {{ msgObj.msg }}
                <i class="swip-user"></i>
              </div>
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
      if(this.$route.query.username != '群聊') {
        var user = {
          time: time,
          lastMsg: this.msg,
          username: this.$route.query.username,
          url: this.$route.query.url
        }
      } else {
        var user = {
          time: time,
          lastMsg: this.msg,
          username: this.$route.query.username,
          url: 'data:image/png;base64,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'
        }
      }

      
      this.addUserList(user)
      this.msg = ''
      CHAT.submit(obj)
    },
  },
  ready: function() {
    CHAT.message(this.loginId)
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
  .talk-all {
    float: left;
  }
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
