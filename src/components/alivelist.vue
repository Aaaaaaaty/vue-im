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
import pinyin from 'pinyin'
  export default {
    data: function() {
      return {
        aliveList: ['an', '赵康帅', 'Zks', 'ltn', '菜虫', 'lby', '杨宏睿', 'zxx', 'jg', '戴诚', 'sup','an', 'admin', 'zks', 'ltn', 'cc', 'lby', '林天南', 'zxx', '安凯', 'adc', 'sup']
      }
    },
    methods: {
      startTalk: function(e) {
        var text = e.currentTarget
        var userName = text.querySelector('.alive-name').innerHTML
        this.$router.go({
          path: '/user/alivelist/info',
          query: {username: userName}
        })
      },
    },
    ready: function() { 
      this.$http.post(settings.server+'/getUser', { username: this.loginId }).then((res) => {
        var userList = res.body
        var friendslist = []
        userList.data.user.map((item, index) => {
          friendslist.push(item.username)
        })
        //quickSort为快速排序
        var quickSort = function(arr) {
          if (arr.length <= 1) { return arr; }
          var pivotIndex = Math.floor(arr.length / 2)
          var pivot = arr.splice(pivotIndex, 1)[0]
          var left = []
          var right = []
          for (var i = 0; i < arr.length; i++){
          if (pinyin(arr[i], {style: pinyin.STYLE_NORMAL})[0][0].charAt(0).toLowerCase() < pinyin(pivot, {style: pinyin.STYLE_NORMAL})[0][0].charAt(0).toLowerCase()) {
            left.push(arr[i])
          } else {
            right.push(arr[i])
          }
        }
          return quickSort(left).concat([pivot], quickSort(right))
        }
        this.aliveList = quickSort(friendslist)
        console.log(this.aliveList)
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
