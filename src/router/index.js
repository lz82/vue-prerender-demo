import Vue from 'vue'
import VueRouter from 'vue-router'

// const HomePage = () => import('pages/home')
import HomePage from 'pages/home'
// const AboutPage = () => import('pages/about')
import AboutPage from 'pages/about'

Vue.use(VueRouter)

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
