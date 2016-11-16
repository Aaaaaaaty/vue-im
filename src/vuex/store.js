import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  loginId: '',
  userName: '',
  userList: [],
}

const mutations = {
  login (state, _id) {
    state.loginId = _id
  },
  talkUserName(state, _username) {
  	state.userName = _username
  },
  addUserList(state, _user) {
    var status = false
    state.userList.map((item, index) => {
      if(item.username == _user.username) {
        item = _user
        status = true
        state.userList.splice(index, 1)
        state.userList.unshift(item)
      }
    })
    if(!status) {
      state.userList.unshift(_user)
    }
  },
  setTime(state, _time) {
    state.time = _time
  }
}

export default new Vuex.Store({
  state,
  mutations
})