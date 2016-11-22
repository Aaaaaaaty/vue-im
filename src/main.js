import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Loginform from './components/loginform'
import User from './components/user'
import AliveList from './components/alivelist'
import Account from './components/account'
import UserList from './components/userlist'
import New from './components/new'
import Talk from './components/talk'
import Noconnect from './components/noconnect'
import Noperson from './components/noperson'
import Info from './components/info'
import Confirm from './components/confirm'
import './public/js/jquery.form.min.js'
import './public/js/jquery.min.js'
// 定义组件
Vue.use(VueRouter)
Vue.use(VueResource)
var router = new VueRouter()
router.map({
  '/': {
    component: Loginform
  },
  '/confirm': {
    component: Confirm
  },
  '/user': {
    component: User,
    subRoutes: {
      '/alivelist': {
        component: AliveList,
        subRoutes: {
          'talk': {
            component: Talk
          },
          '/noperson': {
            component: Noperson
          },
          '/info': {
            component: Info
          }
        }
      },
      '/account': {
        component: Account
      },
      '/userlist': {
        component: UserList,
        subRoutes: {
          '/talk': {
            component: Talk
          },
          '/noconnect': {
            component: Noconnect
          }
        }
      },
      '/new': {
        component: New
      }
    }
  }
})
router.start(App, '#app')
