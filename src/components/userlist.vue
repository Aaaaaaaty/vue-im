<template>
  <div id="nav" @click="an">通讯录</div>
  <div class="content">
    <div class="user-item" v-for="user in userList" @click="startTalk">
      {{user}}
    </div>
  </div>
</template>

<script>
import { getLoginId } from '../vuex/getters'
  export default {
    data: function() {
      return {
        userList: []
      }
    },
    methods: {
      startTalk: function(e) {
        var text = e.target.innerText
        this.$router.go({
          path: '/talk/'+text
        })
      },
      an: function() {

        this.$http.post('http://localhost:3000/api/getUser', { id: this.loginId }).then((res) => {
          var userList = res.body
          console.log(userList.data.user)
          this.userList = userList.data.user.friendslist
        })
      }
    },
    created: function() {
      console.log(this.loginId)
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
  .user-item {
    height: 30px;
    line-height: 30px;
    padding-left: 15px;
    border-bottom: 1px solid $gray-bg;
  }
</style>
