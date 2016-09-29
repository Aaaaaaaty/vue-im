
import superagent from 'superagent'
import setting from '../settings'
const server = setting.server
export const userLogin = function ({ dispatch, state }, user) {
  //第一个参数为store dispatch为store解构得来
  //可以发送http请求后再dispatch分发事件
  superagent.post(server + '/login')
    .send(user)
    .set('Accept', 'application/json')
    .end(function(err, res) {
      if(err) {
        console.log(err)
      } else {
        const obj = res.body
        dispatch('login', obj.status)
      }
    })
  // dispatch('login', user)
}