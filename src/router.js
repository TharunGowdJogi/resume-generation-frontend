import { createRouter, createWebHistory } from "vue-router";
const login = () => import('./views/login.vue');
const home = () => import('./views/home.vue');
const generate_resume = () => import('./views/generate_resume.vue');
const modify_resume = () => import('./views/modify_resume.vue');

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
    },
    {
      path: '/modify-resume/:id',
      name: 'modify-resume',
      component: modify_resume,
    }
  ],
});

export default router;
