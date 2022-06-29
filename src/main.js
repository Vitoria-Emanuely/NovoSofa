import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import VueMask from 'v-mask';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';


Vue.use(Loading, {
  color: '#223F68',
  width: 64,
  height: 64,
  backgroundColor: '#4B4B4B',
  opacity: 0.5,
  zIndex: 999
});

Vue.use(BootstrapVue, IconsPlugin, Vuelidate)
Vue.use(VueMask)
// Vue.use(VueLoading)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
