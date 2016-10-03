<template>
  <div id="nav">通讯录</div>
  <div class="user-list">
    <div class="user-item" v-for="user in userList">
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
  .user-list {
    padding-top: 50px;
  }
</style>
