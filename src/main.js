// 这是入口文件

// 需要引入vue   因为在这要创建vue实例
import Vue from 'vue'
import App from '@/App.vue'
// 还需要引入router  因为要注册router
import router from '@/router'

import axios from '@/api/axios.js'
// 引入ui框架
import ELEMENTUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Component from '@/components/index.js'
import '@/styles/index.less'
Vue.use(Component)
Vue.prototype.$http = axios
Vue.use(ELEMENTUI)
// 创建vue实例
//  vue处理文件   并把处理结果返回给render render把渲染的挂载到#app上
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
