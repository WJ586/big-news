import Vue from 'vue'
import App from './App.vue'
import 'amfe-flexible'
// 引入通用样式
import '../styles/common.less'
import '../styles/iconfont.less'
import router from '../router'
import NewsHeader from '../components/News-header.vue'
import Logo from '../components/Logo.vue'
import { Form, Field, Button, Toast } from 'vant'

Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Toast)
Vue.component('news-header', NewsHeader)
Vue.component('logo', Logo)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
