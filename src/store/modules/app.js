// Pathify
import { make } from 'vuex-pathify'

// Data
const state = {
  drawer: null,
  drawerImage: true,
  mini: false,
  items: [
    {
      title: 'Dashboard',
      icon: 'mdi-view-dashboard',
      to: '/',
    },
    {
      title: 'Gerenciar Animais',
      icon: 'mdi-cow',
      to: '/gerenciar/animais/',
    },
    {
      title: 'Gerenciar Funcionários',
      icon: 'mdi-account-cowboy-hat-outline',
      to: '/gerenciar/funcionarios/',
    },
    {
      title: 'Gerenciar Produção',
      icon: 'mdi-food-drumstick-outline ',
      to: '/gerenciar/producao/',
    },
    {
      title: 'Financeiro',
      icon: 'mdi-currency-usd',
      to: '/components/typography/',
      items: [
        {
          title: 'Animal',
          // to: '/',
        },
        {
          title: 'Pessoal',
          // to: '/components/profile/',
        },

      ]
    },
    // {
    //   title: 'Icons',
    //   icon: 'mdi-chart-bubble',
    //   to: '/components/icons/',
    // },
    // {
    //   title: 'Google Maps',
    //   icon: 'mdi-map-marker',
    //   to: '/maps/google/',
    // },
    // {
    //   title: 'Notifications',
    //   icon: 'mdi-bell',
    //   to: '/components/notifications/',
    // },
  ],
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: async ({ dispatch }) => {
    //
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
