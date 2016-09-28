<template>
  <div class="input-content">
    <input @input="inputValue" class="user-input" type="text"  placeholder="用户名">
    <input @input="inputValue" class="user-input" type="password" placeholder="密码">
  </div>
</template>

<script>
export default {
  method: {
    inputValue:function(e) {
      console.log(e.target.tagName)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"> 
  @import '../utils/utils.scss';
  .input-content {
    text-align: center;
    .user-input {
      // margin-left: 15%;
      border: none;
      outline:medium;
      width: 70%;
      border-bottom: 1px solid $blue-line;
      padding-top: 10px;
      padding-bottom: 7px;
    }
    .user-input::-webkit-input-placeholder {
      color:$gray-holder;
      text-align: center;
    }
  }
  
</style>
