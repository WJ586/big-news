import Vue from 'vue'
import App from './App.vue'
import 'amfe-flexible'
// 引入通用样式
import './styles/common.less'
import './styles/iconfont.less'
import router from './router'
import NewsHeader from './components/n-header.vue'
import Logo from './components/n-logo.vue'
import { Form, Field, Button, Toast } from 'vant'
import axios from 'axios'

// 把axios挂载到vue原型上n
Vue.prototype.$axios = axios
// 配置axios的基准地址
axios.defaults.baseURL = 'http://localhost:3000'

Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Toast)
Vue.component('n-header', NewsHeader)
Vue.component('n-logo', Logo)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
