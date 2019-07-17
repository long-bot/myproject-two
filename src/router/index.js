import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入login
import Login from '@/views/Login'
import Home from '@/views/Home'

import Not from '@/views/NotFound'
import Welcome from '@/views/Welcome'
import Article from '@/views/Article'
// 需要吧router挂载到vue上
Vue.use(VueRouter)

// 配置路由规则
const router = new VueRouter({
  routes: [{
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'home',
    path: '/',
    component: Home,
    children: [{
      name: 'welcome',
      path: '/',
      component: Welcome
    },
    {
      name: 'article',
      path: '/article',
      component: Article
    }
    ]
  },

  {
    name: 'not',
    path: '*',
    component: Not
  }
  ]
})
router.beforeEach((to, form, next) => {
  // to  即将进入的路由对象
  // from当前导航正要离开的路由
  // next 执行管道的下一个钩子  如果全部钩子执行完了  则导航的状态就是confirmed 确认的
  // 判断  如果当前进入的是login  就next
  if (to.path === '/login') {
    return next()
  }
  // 如果当前进入的地址不是login 但是存储了用户信息   就next
  if (sessionStorage.getItem('token')) {
    return next()
  }
  // 如果当前进入的地址不是login  而且还没有存储用户信息   就跳转到login
  next({
    path: '/login'
  })
})
// 导出router对象
export default router
