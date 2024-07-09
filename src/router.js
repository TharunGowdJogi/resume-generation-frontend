import { createRouter, createWebHistory } from "vue-router";
const login = () => import('./views/login.vue');
const home = () => import('./views/home.vue');
const generate_resume = () => import('./views/generate_resume.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/generate-resume',
      name: 'generate-resume',
      component: generate_resume,
    }
  ],
});

export default router;
