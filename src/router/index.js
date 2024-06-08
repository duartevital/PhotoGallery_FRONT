import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Photo from '../views/Photo.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/photo/:id',
    name: 'photo',
    component: Photo,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
