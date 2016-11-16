import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  loginId: '',
  userName: '',
  userList: []
}

const mutations = {
  login (state, _id) {
    state.loginId = _id
  },
  talkUserName(state, _username) {
  	state.userName = _username
  },
  addUserList(state, _username) {
    state.userList.unshift(_username)
  }
}

export default new Vuex.Store({
  state,
  mutations
})