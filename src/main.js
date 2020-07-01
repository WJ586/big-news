import Vue from 'vue'
import App from './App.vue'
import 'amfe-flexible'
// 引入通用样式
import '../styles/common.less'
import '../styles/iconfont.less'
// import router from '../router'
import NewsHeader from '../components/News-header.vue'

Vue.component('news-header', NewsHeader)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
