// 这个 getter 函数会返回 count 的值
// 在 ES6 里你可以写成：
// export const getCount = state => state.count

export function getLoginId (state) {
  return state.loginId
}

export function getUserName (state) {
  console.log(state.userName)
  return state.userName
}