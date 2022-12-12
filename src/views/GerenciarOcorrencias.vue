<template>
    <v-dialog
      v-model="dialogOcurrence"
      max-width="1000px"
      persistent
    >
      <!-- icon="mdi-clipboard-text" -->
      <v-card
      >
        <v-card-title
          class="px-3"
        >
          <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                class="pa-6 rounded"
                fab
              >
                <v-icon
                >
                  mdi-text-box-plus-outline
                </v-icon>
              </v-btn>

              <h2 class="text-h4 ml-4">
                Cadastrar Ocorrencias
              </h2>
              
            
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{storeMod ? "Cadastrar" : "Atualizar"}} Ocorrencia</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                    >
                      <v-text-field
                        label="ID animal*"
                        v-model="form.animal_id"
                        readonly
                        required
                      ></v-text-field>
                    </v-col>
                  
                  <v-col
                      cols="12"
                      sm="12"
                      md="12"
                  >
                    <v-textarea
                      label="Ocorrência"
                      v-model="form.description"
                    ></v-textarea>
                  </v-col>

                  
                  
                  </v-row>
                </v-container>
                <small>*Indica campos obrigatórios</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  @click="fechar()"
                >
                  Fechar
                </v-btn>
                <v-btn
                  color="primary"
                  text
                  @click="storeMod ? cadastrar() : atualizar()"
                >
                  {{storeMod ? "Cadastar" : "Atualizar"}}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-title>
        <v-card-text
          class="py-0 px-3"
        >
        <FiltrarBusca class="mx-n2" :headers="headers" @exportar-dados="exportarDados" @filtrar-busca="filtrarBusca($event)" @limpar-busca="get()"></FiltrarBusca>
        <v-data-table
        :fixed-header="true"
        :headers="headers"
        :items="items"
        :items-per-page="10"
        >
        <template #item="props">
          <tr>
            <td class="text-start">
              {{props.item.id}}
            </td>
            <td class="text-start">
              {{props.item.animal_id}}
            </td>
            <td class="text-start">
              {{props.item.description}}
            </td>

            <td class="text-start">
              {{$moment(props.item.created_at).utc().format("DD/MM/YYYY HH:mm:ss")}}
            </td>

            <td class="text-start">
              {{props.item.user.name}}
            </td>
            
            <td>
              <v-btn
                icon
                color="success"
                @click="editar(props.item)"
              >
                <v-icon>
                  mdi-pencil-outline 
                </v-icon>
              </v-btn>

              <v-btn
                icon
                color="error"
                @click="confirmar(props.item.id)"
              >
                <v-icon

                >
                  mdi-trash-can-outline 
                </v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
        </v-data-table>

        <ConfirmDialog :dialog="callDialog" :id="dialogId" @confirm-event="deletar($event)"></ConfirmDialog>
        </v-card-text>
        <v-card-actions
        class="justify-end py-1"
        >
          <v-btn
            color="primary"
            text
            @click="fecharOcorrencias"
          >
            Fechar
          </v-btn>
        </v-card-actions>

      </v-card>

    
    </v-dialog>
</template>

<script>
  // import mydb from "@/store/fakeDB.js"
  import FiltrarBusca from '../components/FiltrarBusca.vue'
  import ConfirmDialog from '../components/ConfirmDialog.vue'
  import {vm} from "@/main.js"
  export default {
    name: 'GerenciarOcorrencias',
    components: {
      FiltrarBusca,
      ConfirmDialog,
    },
    data: ()=>{
      return {
        users: [],
        headers:[
          {text:'ID', value: 'id'},
          {text:'ID Animal', value: 'animal_id'},
          {text:'Ocorrência', value: 'description'},
          {text:'Data', value: 'created_at'},
          {text:'Funcionário', value: 'user.name'},
          {text:"Acoes"}
        ],
        simpleHeadersText: [],
        simpleHeadersValue: [],
        items: [],
        form: {
          id: "",
          animal_id:"",
          description:"",
          created_at: "",
          user_id: ""
        },
        storeMod: true,
        dialog: false,
        currentId: 5, 
        callDialog: false,
        dialogId: 0,
      }
    },
    props: {
      dialogOcurrence: Boolean,
      animal_id: Number,
    },
    watch: {
      dialogOcurrence(newVal, oldVal) {
        if(newVal) {
          this.get()

          this.form.animal_id = this.animal_id
        } else {
          this.items = []
          this.form.animal_id = ""
        }
      }
    },
    methods: {
      get() {
        this.$http.get("animals/"+this.animal_id+"/events").then(response => {
        this.items = response.data.events
          console.log("🚀 ~ file: GerenciarAnimais.vue:401 ~ this.$http.get ~ response", response)
        }, error => {
          console.log("🚀 ~ file: GerenciarAnimais.vue:403 ~ this.$http.get ~ error", error) 
        })
      },
      editar(element) {
        this.storeMod = false
        
        this.form.id = element.id
        this.form.animal_id = element.animal_id
        this.form.description = element.description
        this.form.user_id = element.user.id

        this.dialog = true

      },
      fechar() {
        this.dialog = false; 
        this.storeMod = true;
        this.form =  {
          animal_id:"",
          description:"",

        }
      },
      atualizar() {
        console.log(this.form)
        this.$http.post("animals/"+this.form.animal_id+"/events/"+this.form.id+"/update",this.form).then(response => {
          this.get()
        }, error => {
          console.log("🚀 ~ file: GerenciarAnimais.vue:392 ~ this.$http.post ~ error", error)
        })
       
        this.fechar()

      },
      cadastrar() {
        this.form.user_id = this.$session.get('user_data').id
        this.form.created_at = this.$moment().format('YYYY-MM-DDTHH:mm:ss')
        console.log(this.form)

        this.$http.post("animals/"+this.animal_id+"/events", this.form).then(response => {
          console.log("🚀 ~ file: GerenciarOcorrencias.vue:267 ~ this.$http.post ~ response", response)
            this.items.push(response.data)
        	}, error => {
        	console.log("🚀 ~ file: GerenciarOcorrencias.vue:270 ~ this.$http.post ~ error", error)
        	}
        )

        this.fechar()
      },
      deletar($event) {

        if($event.value) {
          this.$http.delete('animals/'+this.animal_id+'/events/'+$event.id).then(response => {
              this.items = response.data.events
            },  error => {
              console.log("🚀 ~ file: GerenciarOcorrencias.vue:289 ~ this.$http.delete ~ error", error)
            }
          )
        }
        this.callDialog = false
      },
      confirmar(id) {
        this.dialogId = id
        this.callDialog = true
      },
      
      exportarDados() {
        let dados = []
        console.log("GerenciarOcorrencias")
        for (let index = 0; index < this.items.length; index++) {
          let el = [];
          this.simpleHeadersValue.slice(0,-1).forEach(field=>{
            el.push(this.items[index][field])
          } )

          dados.push(el)
        }
        console.log(dados)

        vm.$emit("ExportarPDF", "gerenciar_ocorrencias",this.simpleHeadersText.slice(0,-1), dados)
      },

      filtrarBusca(event) {
        this.$http.post("animals/"+this.animal_id+"/events-filter", event).then( response => {
          this.items = response.data.events
          console.log("🚀 ~ file: GerenciarAnimais.vue:441 ~ this.$http.post ~ response", response)  
        }, error => {
          console.log("🚀 ~ file: GerenciarAnimais.vue:443 ~ this.$http.post ~ error", error)
        })
      },

      fecharOcorrencias() {
        this.$emit("fechar-dialog-ocorrencia")
      }

    },
    created() {
      this.headers.forEach(element=> {
        this.simpleHeadersText.push(element.text)
        this.simpleHeadersValue.push(element.value)
      })

      this.$http.get('users').then(response => {
        response.data.users.forEach(element => {
          this.users.push({text:element.name, value:element.id})
        })
      })
    }
  }
</script>
