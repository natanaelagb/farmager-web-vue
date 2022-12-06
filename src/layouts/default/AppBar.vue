<template>
  <v-app-bar
    id="default-app-bar"
    app
    absolute
    class="v-bar--underline"
    color="transparent"
    :clipped-left="$vuetify.rtl"
    :clipped-right="!$vuetify.rtl"
    height="70"
    flat
  >
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="drawer = !drawer"
    />

    <default-drawer-toggle class="hidden-sm-and-down" />

    <v-toolbar-title
      class="font-weight-light text-h5"
      v-text="name"
    />

    <v-spacer />

    <default-go-home />

    <!-- <default-notifications /> -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          color="error"
          dark
          v-bind="attrs"
          v-on="on"
          @click="logout()"
        >
          <v-icon>
            mdi-logout
          </v-icon>
        </v-btn>
      </template>
      <span>Logout</span>
    </v-tooltip>

  </v-app-bar>
</template>

<script>
  // Utilities
  import { get, sync } from 'vuex-pathify'

  export default {
    name: 'DefaultBar',

    components: {
      DefaultAccount: () => import(
        /* webpackChunkName: "default-account" */
        './widgets/Account'
      ),
      DefaultDrawerToggle: () => import(
        /* webpackChunkName: "default-drawer-toggle" */
        './widgets/DrawerToggle'
      ),
      DefaultGoHome: () => import(
        /* webpackChunkName: "default-go-home" */
        './widgets/GoHome'
      ),
      DefaultNotifications: () => import(
        /* webpackChunkName: "default-notifications" */
        './widgets/Notifications'
      ),
    },

    computed: {
      ...sync('app', [
        'drawer',
        'mini',
      ]),
      name: get('route/name'),
    },
    methods: {
      logout() {
        console.log('teste')
        this.$http.post('logout',{}).then(response=>{
          console.log(response)
          this.$session.destroy()
          this.$http.defaults.auth = {}
          this.$router.push("/login")
        })

      }
    }
  }
</script>
