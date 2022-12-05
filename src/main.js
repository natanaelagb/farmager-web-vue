import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './plugins'
import store from './store'
import { sync } from 'vuex-router-sync'
import moment from 'moment'
import VueSession from 'vue-session'
import mydb from './store/fakeDB'


window.mydb = mydb
Vue.prototype.$moment = moment
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



