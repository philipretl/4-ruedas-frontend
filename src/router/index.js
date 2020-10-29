import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import Vehicles from '@/components/vehicle/main'
import Owners from '@/components/owner/main'
import ErrorNotFound from '@/components/errors/not-found-exception'
import Forbidden from '@/components/errors/forbidden'
import ErrorServer from '@/components/errors/server-error'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children : [
      {
        path:'vehicles',
        name: 'vehicles',
        component: Vehicles
      },
      {
        path:'owners',
        name: 'owners',
        component: Owners
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: ErrorNotFound
  },
  {
    path: '/403',
    name: '403',
    component: Forbidden
  },
  {
    path: '/error-server',
    name: 'error_server',
    component: ErrorServer,
    props: true,
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
