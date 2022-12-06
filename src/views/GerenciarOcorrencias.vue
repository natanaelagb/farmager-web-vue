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
                <span class="text-h5">{{editMod ? "Cadastrar" : "Atualizar"}} Ocorrencia</span>
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
                        v-model="form.id_animal"
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
                      v-model="form.ocorrencia"
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
                  @click="editMod ? cadastrar() : atualizar()"
                >
                  {{editMod ? "Cadastar" : "Atualizar"}}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-title>
        <v-card-text
          class="py-0 px-3"
        >
        <FiltrarBusca class="mx-n2" :headers="headers" @exportar-dados="exportarDados"></FiltrarBusca>
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
              {{props.item.id_animal}}
            </td>
            <td class="text-start">
              {{props.item.ocorrencia}}
            </td>

            <td class="text-start">
              {{props.item.criado_em}}
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
        
        headers:[
          {text:'ID', value: 'id'},
          {text:'ID Animal', value: 'id_animal'},
          {text:'Ocorrência', value: 'ocorrencia'},
          {text:'Data', value: 'criado_em'},
          {text:"Acoes"}
        ],
        simpleHeadersText: [],
        simpleHeadersValue: [],
        items: [],
        form: {
          id: "",
          id_animal:"",
          ocorrencia:"",
          criado_em: "",
        },
        editMod: true,
        dialog: false,
        currentId: 5, 
        callDialog: false,
        dialogId: 0,
      }
    },
    props: {
      dialogOcurrence: Boolean,
      id_animal: Number,
    },
    watch: {
      dialogOcurrence(newVal, oldVal) {
        if(newVal) {
          console.log(mydb)

          mydb.ocorrencias.forEach(element => {
            if(element.id_animal == this.id_animal) {
              this.items.push(element)
            }
          })

          this.form.id_animal = this.id_animal
        } else {
          this.items = []
          this.form.id_animal = ""
        }
      }
    },
    methods: {
      editar(element) {
        this.editMod = false
        
        this.form.id = element.id
        this.form.id_animal = element.id_animal
        this.form.ocorrencia = element.ocorrencia

        this.dialog = true

      },
      fechar() {
        this.dialog = false; 
        this.editMod = true;
        this.form =  {
          id_animal:"",
          ocorrencia:"",

        }
      },
      atualizar() {
        let id = this.form.id -1
        console.log(this.items[id], this.form)

        this.items[id].ocorrencia = this.form.ocorrencia

        this.fechar()

      },
      cadastrar() {
        let element = JSON.parse(JSON.stringify(this.form));
        element.id = this.currentId + 1
        this.items.push(element)
        this.fechar()
      },
      deletar($event) {
        console.log(mydb.ocorrencias[$event.id-1])
        if($event.value) {
          mydb.ocorrencias.splice($event.id-1, 1)
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
      fecharOcorrencias() {
        this.$emit("fechar-dialog-ocorrencia")
      }

    },
    created() {
      this.headers.forEach(element=> {
        this.simpleHeadersText.push(element.text)
        this.simpleHeadersValue.push(element.value)
      })
    }
  }
</script>
