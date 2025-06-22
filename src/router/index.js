// router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// Importez vos composants de page
import Home from '../Pages/HomePage.vue';
import SignUp from '../Pages/SignUp.vue';
import Login from '@/Pages/loginPage.vue';


const routes = [
  { path: '/', component: Home },
  { path: '/signup', name: 'SignUp', component: SignUp },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/providers/:service',
    name: 'providers',
    component: () => import('@/Pages/providersPage.vue'),
    props: true,
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
