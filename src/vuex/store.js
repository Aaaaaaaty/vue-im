import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isLogin: true,
  noLoginTitle: '登录失败，请重新输入'
}

const mutations = {
  login (state, status) {
    if(status === 'OK') {
      state.isLogin = false
    } 
  }
}

export default new Vuex.Store({
  state,
  mutations
})