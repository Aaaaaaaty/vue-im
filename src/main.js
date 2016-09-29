import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Hello from './components/Hello'

// 定义组件
Vue.use(VueRouter)
var router = new VueRouter()
router.map({
  '/hello': {
    component: Hello
  }
})
router.start(App, '#app')