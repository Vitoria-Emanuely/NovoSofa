import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router =  new VueRouter ({
  mode: "history",
  base: "/",
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/DefaultLayout.vue'),
      children: [
          {
              path: '',
              name: 'Home',
              component: () => import('@/pages/HomeView.vue'),
              meta: { requiresAuth: true }
            },
      ]
    },
    {
      path: '/login',
      component: () => import('@/layouts/BlankLayout.vue'),
      children: [
          {
              path: 'login',
              name: 'Login',
              component: () => import('@/pages/LoginView.vue')
            },
      ]
    },
  ]
});
  

// router.beforeEach((to, from, next) => {
//   auth.onAuthStateChanged((user) => {
//     const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
//     if (requiresAuth && !user) {
//       next("/login");
//     } else {
//       next();
//     }
//   });
// });
  
export default router