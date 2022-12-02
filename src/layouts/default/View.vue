<template>
  <v-main>
    <v-container fluid :style="style_login">
      <router-view :key="$route.path" />
    </v-container>
  </v-main>
</template>

<script>
  export default {
    name: 'DefaultView',
    computed: {
      style_login() {
        return this.$route.path.includes('login') ? "margin:0; padding: 0" : ""
      }
    }
  }
</script>
