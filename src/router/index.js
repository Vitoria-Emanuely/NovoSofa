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
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/pages/HomeView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'perfil',
          name: 'perfil',
          component: () => import('@/pages/PerfilView.vue')
        },
        {
          path: 'login',
          name: 'login',
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