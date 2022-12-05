<template>
  <v-container
    fluid
    class="px-5"
    >
    <v-row>
        <v-col
        md="3"
        sm="12"
        xs="12"
        >
        <v-text-field
            label="Buscar"
            prepend-inner-icon="mdi-magnify"
        >

        </v-text-field>
        </v-col>
        <v-col
        md="3"
        sm="12"
        xs="12"
        >
        <v-autocomplete
            label="Campo"
            :items="headers.slice(0,-1)"
        >

        </v-autocomplete>
        </v-col>

        <v-col
        md="3"
        sm="12"
        xs="12"
        class="d-flex"
        >
        
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
            <v-btn
                fab
                color="primary"
                class="ms-2"
                v-bind="attrs"
                v-on="on"
            >
                <v-icon>
                mdi-filter-outline 
                </v-icon>
            </v-btn>

            </template>
            <span>Filtrar Busca</span>
        </v-tooltip>


        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
            <v-btn
            fab
            color="secondary"
            class="ms-2"
            v-bind="attrs"
            v-on="on"
            v-on:click="$emit('exportar-dados')"
            >
                <v-icon>
                    mdi-file-export-outline
                </v-icon>
            </v-btn>
            </template>
            <span>Exportar Dados</span>
        </v-tooltip>

        </v-col>

    </v-row>
    </v-container>
</template>

<script>
export default {
    name:"FiltrarBusca",
    data: ()=>{
        return {
            busca: "",
            campo: ""
        }
    },
    props: {
        headers: Array
    }
}
</script>