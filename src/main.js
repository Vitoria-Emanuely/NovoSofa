import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import VueMask from 'v-mask';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue, IconsPlugin, Vuelidate)
Vue.use(VueMask)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
