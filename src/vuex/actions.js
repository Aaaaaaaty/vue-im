
import superagent from 'superagent'
import setting from '../settings'
const server = setting.server
export const userLogin = function ({ dispatch, state }, _id) {
  //第一个参数为store dispatch为store解构得来
  //可以发送http请求后再dispatch分发事件
  dispatch('login', _id)
  // dispatch('login', user)
}

export const talkUserName = function( {dispatch, state }, userName) {
	dispatch('talkUserName', userName)
} 

export const addUserList = function( {dispatch, state }, user) {
	dispatch('addUserList', user)
}

export const setTime = function( {dispatch, state }, time) {
	dispatch('setTime', time)
}