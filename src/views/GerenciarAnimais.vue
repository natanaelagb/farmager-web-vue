<template>
  <v-container
    id="regular-tables-view"
    fluid
    tag="section"
  >
    <view-intro
      heading="Gerenciar Animais"
    />
    <!-- icon="mdi-clipboard-text" -->
    <v-card
    >

      <v-card-title
      
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
              class="pa-10 rounded mt-n9"
              fab
            >
              <v-icon
              >
                mdi-text-box-plus-outline
              </v-icon>
            </v-btn>

            <h2 class="text-h4 ml-4 mt-n4">
              Cadastrar Animais
            </h2>
            
          
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{editMod ? "Cadastrar" : "Atualizar"}} Animal</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      label="Espécie*"
                      v-model="form.specie"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      label="Raça*"
                      v-model="form.breed"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-select
                      label="Gênero*"
                      v-model="form.gender"
                      :items="genero"
                      required
                    ></v-select>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      label="Descrição"
                      v-model="form.description"
                      hint="Informações detalhadas sobre o animal"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      label="Massa (Kg)*"
                      v-model="form.weight"
                      hint="80 Kg"
                      required
                      type="number"
                      step="0.1"
                      min="0"
                    ></v-text-field>
                  </v-col>
                  <v-col 
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      label="Data de Nascimento*"
                      v-model="form.birth_date"
                      hint="01/01/2022"
                      type="datetime-local"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col 
                    cols="12"
                    sm="12"
                  >
                    <v-textarea
                      label="Vacinas"
                      v-model="form.vaccines"
                      type="datetime-local"
                      required
                    ></v-textarea>
                  </v-col>

                  <v-col 
                    cols="12"
                    sm="6"
                  >
                    <v-autocomplete
                      label="Pai"
                      v-model="form.father_id"
                      :items="parents"
                    ></v-autocomplete>
                  </v-col>

                  <v-col 
                    cols="12"
                    sm="6"
                  >
                    <v-autocomplete
                      label="Mãe"
                      v-model="form.mother_id"
                      :items="parents"
                    ></v-autocomplete>
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
      <FiltrarBusca :headers="headers" @exportar-dados="exportarDados()"  @filtrar-busca="filtrarBusca($event)" @limpar-busca="get()"></FiltrarBusca>
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
            {{props.item.specie}}
          </td>
          <td class="text-start">
            {{props.item.breed}}
          </td>
          <td class="text-start">
            {{props.item.gender}}
          </td>
          <td class="text-start">
            {{props.item.description}}
          </td>
          <td class="text-start">
            {{props.item.weight}}
          </td>
          <td class="text-start">
            {{$moment(props.item.birth_date).utc().format("DD/MM/YYYY HH:mm:ss")}}
          </td>
          <td class="text-start">
            {{props.item.vaccines}}
          </td>
          <td class="text-start">
            {{props.item.father_id}}
          </td>
          <td class="text-start">
            {{props.item.mother_id}}
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
              <v-icon>
                mdi-trash-can-outline 
              </v-icon>
            </v-btn>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                color="secondary"
                v-bind="attrs"
                v-on="on"
                @click="callDialogOcurrence(props.item.id)"
              >
                <v-icon>
                  mdi-file-document-edit-outline
                </v-icon>
              </v-btn>
              </template>
              <span>Ocorrências</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
      </v-data-table>

      <ConfirmDialog :dialog="dialogConfirm" :id="dialogId" @confirm-event="deletar($event)"></ConfirmDialog>
      <OcorrenciasDialog :dialogOcurrence="dialogOcurrence" :animal_id="dialogAnimal" @fechar-dialog-ocorrencia="(dialogOcurrence = false)"></OcorrenciasDialog>

    </v-card>

  </v-container>
</template>

<script>
  // import mydb from "@/store/fakeDB.js"
  import FiltrarBusca from '../components/FiltrarBusca.vue'
  import ConfirmDialog from '../components/ConfirmDialog.vue'
  import OcorrenciasDialog from './GerenciarOcorrencias.vue'
  import {vm} from "@/main.js"
  export default {
    name: 'GerenciarAnimais',
    components: {
      FiltrarBusca,
      ConfirmDialog,
      OcorrenciasDialog
    },
    data: ()=>{
      return {
        especies: [
          {text:'Vaca', value:'vaca'}, 
          {text:'Boi', value:'boi'}, 
          {text:'Macaco', value:'macaco'},
          {text:'Galinha', value:'galinha'}
        ],
        genero: [
          {text:'Macho'}, 
          {text:'Fêmea'},
        ],
        headers:[
          {text:'Id', value: 'id'},
          {text:'Especie', value: 'specie'},
          {text:'Raça', value: 'breed'},
          {text:'Gênero', value: 'gender'},
          {text:'Descrição', value: 'description'},
          {text:'Massa (Kg)', value: 'weight'},
          {text:'Data de Nascimento', value: 'birth_date'},
          {text:'Vacinas', value: 'vaccines'},
          {text:'Pai', value: 'father_id'},
          {text:'Mãe', value: 'mother_id'},
          {text:"Acoes"}
        ],
        simpleHeadersText: [],
        simpleHeadersValue: [],
        items: [],
        form: {
          id:"",
          specie:"",
          breed: "",
          gender: "",
          description:"",
          weight: "",
          birth_date: "",
          vaccines: "",
          father_id: "",
          mother_id: ""
        },
        editMod: true,
        dialog: false,
        currentId: 5, 
        dialogConfirm: false,
        dialogId: 0,
        dialogOcurrence: false,
        dialogAnimal: 0,
      }
    },
    computed: {
      parents() {
        let parents = []
        this.items.forEach(element=>{
          parents.push(element.id)
        })
        return parents
      }
    },
    methods: {
      editar(element) {
        this.editMod = false
        
        this.form.id = element.id
        this.form.specie = element.specie
        this.form.breed = element.breed
        this.form.gender = element.gender
        this.form.description = element.description
        this.form.weight = element.weight
        this.form.birth_date = this.$moment(element.birth_date).utc().format("YYYY-MM-DDTHH:mm:ss")
        this.form.vaccines = element.vaccines,
        this.form.father_id = element.father_id
        this.form.mother_id = element.mother_id,
        

        this.dialog = true

      },
      fechar() {
        this.dialog = false; 
        this.editMod = true;
        this.form =  {
          id:"",
          specie:"",
          breed: "",
          gender: "",
          description:"",
          weight: "",
          birth_date: "",
          vaccines: "",
          father_id: "",
          mother_id: ""
        }
      },
      atualizar() {
        console.log(this.form)
        this.$http.post("animals/"+this.form.id+"/update",this.form).then(response => {
          this.get()
        }, error => {
          console.log("🚀 ~ file: GerenciarAnimais.vue:392 ~ this.$http.post ~ error", error)
        })

        this.fechar()

      },
      cadastrar() {

        console.log(this.form)
        this.$http.post("animals", this.form).then(response => {
            console.log("🚀 ~ file: GerenciarAnimais.vue:389 ~ this.$http.post ~ response", response)
            this.items.push(response.data)
        	}, error => {
        	  console.log("🚀 ~ file: GerenciarAnimais.vue:392 ~ this.$http.post ~ error", error)
        	}
        )

        this.fechar()
      },
      deletar($event) {
        if($event.value) {
          this.$http.delete('animals/'+$event.id).then(response => {
              this.items = response.data.animals
            },  error => {
              console.log("🚀 ~ file: GerenciarAnimais.vue:404 ~ this.$http.delete ~ error", error)
            }
          )
        }
        this.dialogConfirm = false
      },
      confirmar(id) {
        this.dialogId = id
        this.dialogConfirm = true
      },
      
      exportarDados() {
        let dados = []
        console.log("GerenciarAnimais")
        for (let index = 0; index < this.items.length; index++) {
          let el = [];
          this.simpleHeadersValue.slice(0,-1).forEach(field=>{
            el.push(this.items[index][field])
          } )

          dados.push(el)
        }
        console.log(dados)

        vm.$emit("ExportarPDF", "gerenciar_animais",this.simpleHeadersText.slice(0,-1), dados)
      },

      filtrarBusca(event) {
        this.$http.post("animals-filter", event).then( response => {
          this.items = response.data.animals
          console.log("🚀 ~ file: GerenciarAnimais.vue:441 ~ this.$http.post ~ response", response)  
        }, error => {
          console.log("🚀 ~ file: GerenciarAnimais.vue:443 ~ this.$http.post ~ error", error)
        })
      },

      callDialogOcurrence(id) {
        this.dialogOcurrence = true
        this.dialogAnimal = id
      },

      get() {
        this.$http.get('animals').then(response => {
        this.items = response.data.animals
          console.log("🚀 ~ file: GerenciarAnimais.vue:401 ~ this.$http.get ~ response", response)
        }, error => {
          console.log("🚀 ~ file: GerenciarAnimais.vue:403 ~ this.$http.get ~ error", error) 
        })
      },

    },
    created() {

      this.headers.forEach(element=> {
        this.simpleHeadersText.push(element.text)
        this.simpleHeadersValue.push(element.value)
      })

      this.get()
      
    }
  }
</script>
