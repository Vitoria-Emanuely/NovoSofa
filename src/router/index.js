import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/DefaultLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/pages/HomeView.vue'),
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/pages/ProfileView.vue')
        },
        {
          path: 'bonds',
          name: 'bonds',
          component: () => import('@/pages/BondView.vue')
        }
      ]
    },

    {
      path: '/',
      component: () => import('@/layouts/BlankLayout.vue'),
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('@/pages/LoginView.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('@/pages/RegisterView.vue')
        }
      ]
    },
  ]
});


router.beforeEach((to, from, next) => {
  // const dateObj = new Date().toLocaleString();
  // if (localStorage.getItem('expired') === dateObj) {
  //   next({ name: 'login' });
  // }
  if (to.name !== "login" && to.name !== "register" && localStorage.getItem('token') == null) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router