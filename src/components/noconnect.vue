<template>
  <div class="talk-content">
    <div class="talk-inner">
      <div class="talk-nav">
        <!--{{$route.query.username}}-->
        <div class="talk-title">
        </div>
      </div>
      <div class="content">
        <i class="content-empty"></i>
        <p>未选择聊天</p>
      </div>
      <div class="talker">
      </div>
    </div>
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
      // CHAT.message(this.loginId)
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
        padding-top: 130px;
        color: #ccc;
        font-size: 13px;
      }
    }
  }
  
</style>
