import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import User from '../views/user.vue'
import EditUser from '../views/EditUser.vue'
import Demo from '../views/Demo.vue'
import MyFollow from '../views/MyFollows.vue'
import MyComments from '../views/MyComments.vue'
import MyStar from '../views/MyStar.vue'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  routes: [
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/user', component: User, name: 'user' },
    { path: '/edit-user', component: EditUser, name: 'edituser' },
    { path: '/demo', component: Demo },
    { path: '/myfollows', component: MyFollow },
    { path: '/mycomments', component: MyComments },
    { path: '/mystar', component: MyStar }
  ]
})
// 全局的导航守卫（路由的钩子函数 beforeEach afterEach）
// to:到哪儿去
// from:从哪儿来
// next():代表放行
// 保存所有需要登录才能访问的页面
const pages = ['/user', '/edit-user', '/myfollows', '/mycomments', '/mystar']
router.beforeEach(function(to, from, next) {
  // console.log('全局的前置导航守卫')
  // console.log('to', to)
  // console.log('from', from)
  const token = localStorage.getItem('token')
  // 如果去的页面是user页面，就需要判断是否有token
  if (pages.includes(to.path)) {
    // 判断是否有token，如果没有token,去登录，如果有token，放走
    if (token) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})
export default router
