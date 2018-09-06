import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const HomePage = () => import('pages/home')

const AboutPage = () => import('pages/about')

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: HomePage
  },
  {
    path: '/about',
    component: AboutPage
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
