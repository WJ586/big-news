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
import Post from './components/n-post.vue'
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
  Uploader,
  List,
  Tab,
  Tabs
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
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Uploader)
Vue.use(List)
Vue.use(Tab)
Vue.use(Tabs)
Vue.component('n-header', NewsHeader)
Vue.component('n-logo', Logo)
Vue.component('n-nav', Nav)
Vue.component('n-post', Post)
Vue.config.productionTip = false

// 定义全局过滤器
Vue.filter('time', function(input, str = 'YYYY-MM-DD') {
  return moment(input).format(str)
})

Vue.prototype.$url = function(url) {
  if (url.startsWith('http')) {
    return url
  } else {
    return axios.defaults.baseURL + url
  }
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
