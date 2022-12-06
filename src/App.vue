<template>
  <v-fade-transition mode="out-in">
    <router-view />
  </v-fade-transition>
</template>

<script>
  // Styles
  import '@/styles/overrides.sass'
  import {vm} from './main.js'
  import jsPDF from 'jspdf'
  import autoTable from 'jspdf-autotable'

  export default {
    name: 'App',
    metaInfo: {
      title: 'Farmager',
      titleTemplate: '%s | Gerenciador de Fazendas',
      htmlAttrs: { lang: 'pt-br' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
    created() {
      this.$http.post("login",{})

      vm.$on("ExportarPDF", (_title,_headers, _body)=>{
        const doc = new jsPDF()

        autoTable(doc, {
          head: [_headers],
          body: 
            _body
            // ...
          ,
        })

        doc.save(_title+"_"+this.$moment().format("DD/MM/YYYY_HH:mm:ss"))

      })
    }
  }
</script>
