import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from "../store";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "about" */ '../views/Weibo.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/chat/:id',
    component: () => import(/* webpackChunkName: "about" */ '../views/Chat.vue')
  },
  {
    path: '/plaza',
    component: () => import(/* webpackChunkName: "about" */ '../views/Plaza.vue')
  },
  {
    path: '/user/:id',
    component: () => import(/* webpackChunkName: "about" */ '../views/User.vue')
  },
  {
    path: '/weibo',
    component: () => import(/* webpackChunkName: "about" */ '../views/Weibo.vue')
  },
  {
    path: '/register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  var need_login = false
  var gs = ['/home','/plaza']
  console.log(to.path)
  if(gs.includes(to.path)) need_login =true

  if (store.state.user == null && need_login)  alert('请先登录') ;
  else next()
})

export default router
