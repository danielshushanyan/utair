import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css'
import App from './App.vue';
import store from './store/index';

Vue.use(VueMaterial);
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
