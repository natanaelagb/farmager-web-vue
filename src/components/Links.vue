<template>
  <v-container>
    <v-row style="justify-content:center">
      
      <v-col
      >
        <div class="text-body-1 font-weight-light pt-6 pt-md-0 text-center">
          &copy; {{ (new Date()).getFullYear() }}, Produzido por <v-icon>mdi-vuetify</v-icon>
          <a
            class="text-decoration-none"
          >Farmager</a>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Links',

    data: () => ({
      links: [
        {
          href: 'https://vuetifyjs.com/',
          text: 'Vuetify Docs',
        },
        {
          href: '#',
          text: 'About Us',
        },
        {
          href: '#',
          text: 'Blog',
        },
        {
          href: '#',
          text: 'Licenses',
        },
      ],
    }),
  }
</script>

<style lang="sass" scoped>
  a
    color: inherit !important
</style>
