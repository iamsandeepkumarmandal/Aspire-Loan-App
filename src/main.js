import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Vuelidate);
Vue.use(VueSweetalert2);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
