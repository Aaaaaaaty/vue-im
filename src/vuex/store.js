import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0
}

const mutations = {
  login (state, amount) {
    state.count = state.count + amount
    console.log(amount.user)
    if(amount) {
    	alert(amount.user.username+',Welcome!!')
    }
  }
}

export default new Vuex.Store({
  state,
  mutations
})