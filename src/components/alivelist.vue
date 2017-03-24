<template>
  <div class="alive-list">
    <div class="alive-content">
      <div track-by="$index" v-for="alive in aliveList" @click="startTalk">
        <div v-if="alive.type == 'person'" class="alive-item">
          <div  class="alive-name">
            <img v-bind:src="alive.url" class="alive-img">
              {{alive.username}}
          </div>
        </div>
        <div v-else class="alive-sym">{{alive}}</div>
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
        aliveList: [],
        url:'',
      }
    },
    methods: {
      startTalk: function(e) {
        var text = e.currentTarget
        var userName = text.querySelector('.alive-name').innerText
        var url = text.querySelector('.alive-img').getAttribute('src')
        console.log(url)
        this.$router.go({
          path: '/user/alivelist/info',
          query: { 
            username: userName,
            url: url
          }
        })
      },
    },
    ready: function() { 
      this.$http.post(settings.server+'/getUserList', { username: this.loginId }).then((res) => {
        var friendslist = res.body.data.user
        //quickSort为快速排序
        var quickSort = (arr) => {
          var _arr = arr.map((item, index) => {
            return item
          })
          if (_arr.length <= 1) { return _arr; }
          var pivotIndex = Math.floor(_arr.length / 2)
          var pivot = _arr.splice(pivotIndex, 1)[0]
          var left = []
          var right = []
          for (var i = 0; i < _arr.length; i++){
            if (pinyin(_arr[i].username, {style: pinyin.STYLE_NORMAL})[0][0].charAt(0).toLowerCase() <= pinyin(pivot.username, {style: pinyin.STYLE_NORMAL})[0][0].charAt(0).toLowerCase()) {
              left.push(_arr[i])
            } else {
              right.push(_arr[i])
            }
        }
          return quickSort(left).concat([pivot], quickSort(right))
        }
        var addSymList = function(arr) { //添加字母分隔符
          var findSym = pinyin(arr[0].username, {style: pinyin.STYLE_NORMAL})[0][0].charAt(0).toUpperCase()
          var status = false
          var addedList = []
          arr.map((item, index) => {
            if(pinyin(item.username, {style: pinyin.STYLE_NORMAL})[0][0].charAt(0).toUpperCase() == findSym) {
              if(!status) {
                addedList.push(findSym)
                console.log('item', item.url, index)
                addedList.push(item)
                status = true
              } else {
                addedList.push(item)
                console.log('item', item.url, index)
              }
            } else {
              findSym = pinyin(item.username, {style: pinyin.STYLE_NORMAL})[0][0].charAt(0).toUpperCase()
              addedList.push(findSym)
              addedList.push(item)
            }
          })
          return addedList
        }
        this.aliveList = addSymList(quickSort(friendslist))
        console.log('this.aliveList', this.aliveList)
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
          // background-color: $gray;
        }
        .alive-name {
          overflow: hidden;
          font-weight: 400;
          font-size: 13px;
          color: #FFF;
          line-height: 20px;
        }
      }
      .alive-sym {
        margin: 0;
        padding: 1px 18px;
        font-weight: 400;
        color: #787b87;
        background: #292d32;
        font-size: 14px;
      }
    }
  }
  .alive-list::-webkit-scrollbar {
    width:0px
  }
  
</style>
