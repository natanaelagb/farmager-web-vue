// Imports
import Vue from 'vue'
import Router from 'vue-router'
import { trailingSlash } from '@/util/helpers'

import {
  layout,
  route,
} from '@/util/routes'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: '/',
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes: [
    layout('Default', [
      route('Dashboard'),

      // Pages
      route('UserProfile', null, '/components/profile'),

      // Components
      route('Notifications', null, '/components/notifications'),
      route('Icons', null, '/components/icons'),
      route('Typography', null, '/components/typography'),

      // Gerenciamento
      route('Gerenciar Animais', null, '/gerenciar/animais'),
      route('Gerenciar Funcionarios', null, '/gerenciar/funcionarios'),
      route('Gerenciar Producao', null, '/gerenciar/producao'),
      route('Gerenciar Estoque', null, '/gerenciar/estoque'),
      route('Gerenciar Financeiro', null, '/gerenciar/financeiro'),
      route('Login', null, '/login'),

      // Maps
    ]),
  ],
})

router.beforeEach(async (to, from, next) => {
  // let isAuthenticated = false

  // await $http.post('login', {}, {baseURL:"http://localhost:8081/farmager/api/public/"}).then(response => {

  //   if (response.status === 200) {
  //     isAuthenticated = true
  //   }
  // }, err => {
  //   console.log('err authenticate', err)
  // })

  // if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  // else 
  return to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
})


export default router
