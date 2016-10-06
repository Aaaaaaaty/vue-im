<template>
  <div id="nav">{{$route.params.username}}</div>
  <div class="content">
  </div>
  <div class="talker">
    <input class="talker-input" type="text">
    <span class="talker-send">发送</span>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        user: ''
      }
    },
    methods: {
      
    },
    created: function() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../utils/utils.scss';
  .talker {
    position: fixed;
    bottom: 0;
    width: 100%;
    border: 1px solid $blue-button-in;
    border-radius: 17px;
    .talker-input {
      position: absolute;
      border: none;
      height: 100%;
      outline:medium;
      width: 75%;
      left: 5%;
    }
    .talker-send {
      float: right;
      width: 11%;
      text-align: center; 
      border: 1px solid $blue-button-in;
      border-radius: 15px;
      font-size: 14px;
      padding: 6px 3% 6px 3%;
      background-color: $blue-button-in;
      color: $white;
      text-decoration: none;
    }
  }
</style>
