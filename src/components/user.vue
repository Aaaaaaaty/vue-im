<template>
  <div class="user-info">
    <div class="user-name">
      <div class="user-avatar">
        <img v-bind:src='url' class="img"></img>
      </div>
      <div class="user-nickname">
        <span>{{username}}</span>
        <i @click="show = !show"></i>
          <div v-if="show" class="user-add-user">
            <span @click ="show_input =! show_input">好友管理</span>
            <input type="text" v-if="show_input" placeholder="用户名" v-model="add_friend">
            <p class="user-add-btn" v-if="show_input" @click="addFriend">添加</p>
            <p class="user-add-btn" v-if="show_input" @click="deleteFriend">删除</p>
          </div>
      </div>
    </div>
    <div class="user-setting"></div>
    <div class="user-search">
      个性签名:{{userSign}}
    </div>
    <ul id="footer">
      <li class="footer-nav" 
          id="alivelist" 
          v-link="{path: '/user/userlist/noconnect', activeClass: 'active'}" 
          >
        <i class="iconfont" >&#xe740</i>
      </li>
      <li class="footer-nav" 
          id="userlist" 
          v-link="{path: '/user/alivelist/noperson', activeClass: 'active'}"
          >
        <i class="iconfont" id="alivelist" >&#xe603</i>
      </li>
      <li class="footer-nav" 
          id="userlist" ß
          v-link="{path: '/user/userlist/talk/', activeClass: 'active', query: {username: '群聊'}}"
          >
        <i class="iconfont" id="alivelist" >&#xe62a</i>
      </li>
    </ul>
  </div>
  <router-view keep-alive></router-view>
</template>
<script>
import { getLoginId } from '../vuex/getters'
import settings from '../settings.js'
  export default {
    data: function() {
      return {
        url: '',
        username: '',
        show: false,
        show_input: false,
        userSign: '我用双脚 成就你的梦想',
        add_friend: ''
      }
    },
    methods: {
      addFriend: function() {
        this.$http.post(settings.server + '/getUserInfo', { username: this.add_friend }).then((res) => {
          let result = res.data.data.user
          let norepeatFriend = false
          if(result.username !== this.loginId) {
            if(result.friendslist.length) {
              result.friendslist.map((obj, index) => {
                if(obj.username == this.loginId) {
                  norepeatFriend = true
                  alert('已有该好友',norepeatFriend)
                }
              })
            }
            if(!norepeatFriend) {
              this.show = false
              this.$http.post(settings.server + '/getUserInfo', { username: this.loginId }).then((res) => {
                let login_result = res.data.data.user
                result.friendslist.push({
                  username: this.loginId,
                  url: login_result.url
                })
                let new_user = {
                  _id: result._id,
                  friendslist: result.friendslist
                }
                this.$http.post(settings.server + '/updateUser', new_user).then((res) => {
                  let result = res.data
                   if(result.status === 'OK') {
                      alert('添加成功！')
                    } else {
                      alert('出错了。')
                    }
                })
                login_result.friendslist.push({
                  username: this.add_friend,
                  url: result.url
                })
                let new_login = {
                  _id: login_result._id,
                  friendslist: login_result.friendslist
                }
                this.$http.post(settings.server + '/updateUser', new_login).then((res) => {
                  let result = res.data
                })
              })
            }
          }
        })
      },
      deleteFriend: function() {
      this.$http.post(settings.server + '/getUserInfo', { username: this.add_friend }).then((res) => {
          let result = res.data.data.user
          this.show = false
          this.$http.post(settings.server + '/getUserInfo', { username: this.loginId }).then((res) => {
            let login_result = res.data.data.user
            let result_friendsList = []
            result.friendslist.forEach((item, index) => {
              if( item.username !== this.loginId ) {
                result_friendsList.push(item)
              } 
            })
            let new_user = {
              _id: result._id,
              friendslist: result_friendsList
            }
            this.$http.post(settings.server + '/updateUser', new_user).then((res) => {
              let result = res.data
              if(result.status === 'OK') {
                alert('删除成功！')
              } else {
                alert('出错了。')
              }
            })
            let login_result_friendsList = []
            login_result.friendslist.forEach((item, index) => {
              if( item.username !== this.add_friend ) {
                login_result_friendsList.push(item)
              }
            })
            let new_login = {
              _id: login_result._id,
              friendslist: login_result_friendsList
            }
            this.$http.post(settings.server + '/updateUser', new_login).then((res) => {
              let result = res.data
              console.log('result', result)
            })
          })
      })
    },
    },
    ready: function() {
      this.$http.post(settings.server + '/getUserInfo', { username: this.loginId }).then((res) => {
        let result = res.data.data.user
        this.url = result.url
        this.username = result.username
      })
    },
    vuex: {
      getters: {
        loginId: getLoginId
      }
    },
    
  }
</script>

<style lang="scss">
  @import '../utils/utils.scss';
  .user-info {
    position: fixed;
    left: 0;
    background: $background-color;
    width: 280px;
    .user-name {
      color: $white;
      height: 40px;
      padding: 18px;
      background-color: $background-color;
      .user-avatar {
        display: table-cell;
        vertical-align: middle;
        word-wrap: break-word;
        word-break: break-all;
        white-space: nowrap;
        padding-right: 10.625px;
        .user-profile-mini {
          position: absolute;
          z-index: 1024;
          width: 220px;
          background-color: white;
          img {
            width: 220px;
            height: 220px;
            display: block;
          }
          .user-profile-info {
            padding: 20px;
            min-height: 74px;
          }
        }
        .img {
          width: 40px;
          height: 40px;
          background-color: #fff;
          border-radius: 2px;
          -moz-border-radius: 2px;
          -webkit-border-radius: 2px;
          display: inline-block;
          cursor: pointer;
        }
      }
      .user-nickname {
        display: table-cell;
        vertical-align: middle;
        word-wrap: break-word;
        word-break: break-all;
        width: 2000px;
        span {
          display: inline-block;
          font-weight: 400;
          width: 156px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          color: #fff;
          font-size: 18px;
          vertical-align: top;
          line-height: 31px;
          text-decoration: none;
        }
        i {
          background: url(http://res.wx.qq.com/zh_CN/htmledition/v2/images/icon/sprite31b57c.png) 0 -406px;
          width: 30px;
          height: 30px;
          vertical-align: middle;
          display: inline-block;
          cursor: pointer;
        }
        .user-add-user {
          position: fixed;
          width: 200px;
          background-color: #eee;
          border-radius: 5px;
          z-index: 300;
            span {
              color: black;
              font-size: 12px;
              font-weight: 500;
              padding: 4px 0px 0px 10px;
              cursor: pointer;
            }
            input {
              background-color: $white;
              margin: 5px 0px 10px 10px;
              border: 1px solid white;
              border-radius: 5px;
              padding: 5px;
              width: 76px;
            }
            .user-add-btn {
              display: inline-block;
              color: white;
              font-size: 12px;
              padding: 5px 8px;
              margin-left: 5px; 
              background-color: $right-red;
              border-radius: 5px;
            }
        }
      }
    }
    .user-search {
      height: 32px;
      width: 244px;
      background-color: $background-color;
      margin: 0 auto 6px;
      color: $gray;
      font-size: 12px; 
    }
    #footer {
      .footer-nav {
        display: block;
        position: relative;
        color: $gray-holder;
        text-align: center;
        font-size: 12px;
        width: 33%;
        height: 40px;
        float: left;
        .iconfont {
          font-family: "iconfont";
          font-size: 30px;
          font-style: normal;
          position: absolute;
          left: 30%;
        }
        #xe602 {
          font-size: 20px;
          left: 30%;
        }
        list-style: none;
      }
      .active {
        color: $right-red;
      }
    }
    #footer:after {
      content: '';
      display: table;
      clear: both;
    }
  }
  #userlist {
    font-size: 34px;
    top: 1px;
  }
</style>
