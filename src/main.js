import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './plugins'
import store from './store'
import { sync } from 'vuex-router-sync'
import moment from 'moment'
import VueSession from 'vue-session'
import axios from 'axios'
import mydb from './store/fakeDB'


const $http = axios.create({
  baseURL:"http://localhost:8081/farmager/api/public/",
})

$http.interceptors.response.use( response => {
  return response
}, error => {
  console.log("interceptor response error", error)
  if(error.response.status == 401) {
    router.push("/login")
  }
})


window.mydb = mydb
Vue.prototype.$moment = moment
Vue.prototype.$http = $http
// window.moment = moment
Vue.config.productionTip = false
Vue.use(VueSession)

sync(store, router)

export const vm = window.vm = new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
})

vm.$mount('#app')



