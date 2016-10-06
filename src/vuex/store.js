import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  loginId: ''
}

const mutations = {
  login (state, _id) {
    state.loginId = _id
  }
}

export default new Vuex.Store({
  state,
  mutations
})