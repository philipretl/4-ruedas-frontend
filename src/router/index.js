import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import Vehicles from '@/components/vehicle/main'
import Owners from '@/components/owner/main'

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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
