<template>
  <div id="nav">通讯录</div>
  <div class="content">
    <div class="user-item" v-for="user in userList" @click="startTalk">
      {{user.username}}
    </div>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        userList: []
      }
    },
    methods: {
      startTalk: function(e) {
        var text = e.target.innerText
        this.$router.go('/talk/'+text)
      }
    },
    created: function() {
      this.$http.post('http://localhost:3000/api/getUserList').then((res) => {
        var userList = res.body.data.user
        this.userList = userList
      })
    }
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
