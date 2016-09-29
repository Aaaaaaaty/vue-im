<template>
  <h1>Hello App!{{counterValue}}</h1>
</template>

<script>
  import { getCount } from '../vuex/getters'
  export default {
    vuex: {
      getters: {
        counterValue: getCount
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
