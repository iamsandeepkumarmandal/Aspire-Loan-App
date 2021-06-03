import Vue from 'vue';
import VueRouter from 'vue-router';
import { checkUserSession } from '@/services/login-register.api';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

async function userSessionCheck(to, from, next) {
  const response = await checkUserSession();
  if (response.statusCode === 200) {
    next('/dashboard');
  } else {
    next();
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      userSessionCheck(to, from, next);
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/login-register/register.vue'),
    beforeEnter: (to, from, next) => {
      userSessionCheck(to, from, next);
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login-register/login.vue'),
    beforeEnter: (to, from, next) => {
      userSessionCheck(to, from, next);
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/index.vue'),
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('@/views/logout/index.vue'),
  },
  {
    path: '/admin-dashboard',
    name: 'adminDashboard',
    component: () => import('@/views/admin-dashboard/index.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
