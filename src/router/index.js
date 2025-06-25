import { createRouter, createWebHistory } from 'vue-router'
import collectamVue from '../Pages/collectamVue.vue'
import mapVue from '../Pages/mapVue.vue'

const routes = [
  { path: '/', name: 'collectam', component: collectamVue },
  { path: '/map', name: 'map', component: mapVue, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

