// 这个 getter 函数会返回 count 的值
// 在 ES6 里你可以写成：
// export const getCount = state => state.count

export function isLogin (state) {
  console.log(state.isLogin)
  return state.isLogin
}