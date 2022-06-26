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
          path: 'perfil',
          name: 'perfil',
          component: () => import('@/pages/PerfilView.vue')
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
  // if (localStorage.getItem('expired' != null && ))
  console.log(localStorage)
  if (to.name !== "login" && to.name !== "register" && localStorage.getItem('token') == null){
    next({name: 'login'});
  } else {
    next();
  }
});

export default router