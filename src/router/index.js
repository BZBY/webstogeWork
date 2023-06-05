import { createRouter, createWebHistory } from 'vue-router'
import Home from '../layout/Home/index.vue'
import Login from '../layout/Login/index.vue'
import Register from '../layout/Register/index.vue'
import ArticleDetial from '../layout/ArticleDetial/index.vue'
import About from '../layout/About/index.vue'
import MyCreate from '../layout/MyCreate/index.vue'
import Center from '../layout/Center/index.vue'
import Note from '../layout/Note/index.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home //首页
    },
    {
      path: '/login',
      name: 'Login',
      component: Login //登录页
    },
    {
      path: '/register',
      name: 'Register',
      component: Register //注册页
    },
    {
      path: '/articleDetial',
      name: 'ArticleDetial',
      component: ArticleDetial //文章详情页
    },
    {
      path: '/about',
      name: 'About',
      component: About //报告页
    },
    {
      path: '/myCreate',
      name: 'MyCreate',
      component: MyCreate 
    },
    {
      path: '/note',
      name: 'Note',
      component: Note
    },
    {
      path: '/userCenter',
      name: 'Center',
      component: Center //个人中心
    }

  ]
})


export default router


