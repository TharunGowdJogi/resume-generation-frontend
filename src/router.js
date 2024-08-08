import { createRouter, createWebHistory } from "vue-router";
const login = () => import('./views/login.vue');
const home = () => import('./views/home.vue');
const generate_resume = () => import('./views/generate_resume.vue');
const modify_resume = () => import('./views/modify_resume.vue');
const my_resume = () => import('./views/all_resume.vue');
const manage_resumes = () => import('./views/manage_resumes.vue');
const manage_users = () => import('./views/manage_users.vue');

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
    }, 
    {
      path: '/my-resume',
      name: 'my-resume',
      component: my_resume
    },
    {
      path: '/manage-resumes',
      name: 'manage-resumes',
      component: manage_resumes
    },
    {
      path: '/manage-users',
      name: 'manage-users',
      component: manage_users
    },

  ],
});

export default router;
