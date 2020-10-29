import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/tailwind.css'

Vue.config.productionTip = false

window.clone = function ( obj ){ // sirve para clonar un objeto, es un helper
  return JSON.parse(JSON.stringify(obj)); //
}

window.sleep = function sleep(ms) {
  return new Promise(
      resolve => setTimeout(resolve, ms)
  );
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
