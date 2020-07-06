import Vue from 'vue'
import App from './App.vue'
import 'amfe-flexible'
// 引入通用样式
import './styles/common.less'
import './styles/iconfont.less'
import router from './router'
import NewsHeader from './components/n-header.vue'
import Logo from './components/n-logo.vue'
import Nav from './components/n-nav.vue'
import {
  Form,
  Field,
  Button,
  Toast,
  Dialog,
  RadioGroup,
  Radio,
  Cell,
  CellGroup,
  Uploader
} from 'vant'

import axios from 'axios'
import moment from 'moment'

// 把axios挂载到vue原型上n
Vue.prototype.$axios = axios
// 配置axios的基准地址
axios.defaults.baseURL = 'http://localhost:3000'

// 给axios配置请求拦截器
axios.interceptors.request.use(function(config) {
  // 浏览器发送的ajax请求的所有配置信息
  // 给所有的请求添加token
  // console.log(config)
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

// 响应拦截器
axios.interceptors.response.use(function(res) {
  const { statusCode, message } = res.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    // token失效导致
    Toast.fail(message)
    // 跳转到登录页面
    router.push('/login')
    // 删除过期的token
    localStorage.removeItem('token')
    localStorage.removeItem('clickId')
  }
  return res
})
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Toast)
Vue.use(Dialog)
Vue.component('n-header', NewsHeader)
Vue.component('n-logo', Logo)
Vue.component('n-nav', Nav)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Uploader)
Vue.config.productionTip = false

// 定义全局过滤器
Vue.filter('time', function(input) {
  return moment(input).format('YYYY-MM-DD')
})

// 全局的导航守卫（路由的钩子函数 beforeEach afterEach）
// to:到哪儿去
// from:从哪儿来
// next():代表放行
// 保存所有需要登录才能访问的页面
const pages = ['/user', '/edit-user']
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
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
