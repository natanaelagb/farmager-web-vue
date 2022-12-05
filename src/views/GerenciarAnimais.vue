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
                      v-model="form.especie"
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
                      v-model="form.raca"
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
                      v-model="form.genero"
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
                      v-model="form.descricao"
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
                      v-model="form.massa"
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
                      v-model="form.data_nascimento"
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
                      v-model="form.vacinas"
                      type="datetime-local"
                      required
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
      <FiltrarBusca :headers="headers" @exportar-dados="exportarDados"></FiltrarBusca>
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
            {{props.item.especie}}
          </td>
          <td class="text-start">
            {{props.item.raca}}
          </td>
          <td class="text-start">
            {{props.item.genero}}
          </td>
          <td class="text-start">
            {{props.item.descricao}}
          </td>
          <td class="text-start">
            {{props.item.massa}}
          </td>
          <td class="text-start">
            {{props.item.data_nascimento}}
          </td>
          <td class="text-start">
            {{props.item.vacinas}}
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
      <OcorrenciasDialog :dialogOcurrence="dialogOcurrence" :id_animal="dialogAnimal"></OcorrenciasDialog>

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
          {text:'Macho', value:'M'}, 
          {text:'Fêmea', value:'F'},
        ],
        headers:[
          {text:'Id', value: 'id'},
          {text:'Especie', value: 'especie'},
          {text:'Raça', value: 'raca'},
          {text:'Gênero', value: 'genero'},
          {text:'Descrição', value: 'descricao'},
          {text:'Massa (Kg)', value: 'massa'},
          {text:'Data de Nascimento', value: 'data_nascimento'},
          {text:'Vacinas', value: 'vacinas'},
          {text:"Acoes"}
        ],
        simpleHeadersText: [],
        simpleHeadersValue: [],
        items: 
          mydb.animais
        ,
        form: {
          id:"",
          especie:"",
          raca: "",
          genero: "",
          descricao:"",
          massa: "",
          data_nascimento: "",
          vacinas: ""
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
    methods: {
      editar(element) {
        this.editMod = false
        
        this.form.id = element.id
        this.form.especie = element.especie
        this.form.raca = element.raca
        this.form.genero = element.genero
        this.form.descricao = element.descricao
        this.form.massa = element.massa
        this.form.data_nascimento = element.data_nascimento
        this.form.vacinas = element.vacinas

        this.dialog = true

      },
      fechar() {
        this.dialog = false; 
        this.editMod = true;
        this.form =  {
          id:"",
          especie:"",
          raca: "",
          genero: "",
          descricao:"",
          massa: "",
          data_nascimento: "",
          vacinas: ""
        }
      },
      atualizar() {
        let id = this.form.id -1
        console.log(this.items[id], this.form)

        this.items[id].especie = this.form.especie
        this.items[id].raca = this.form.raca
        this.items[id].genero = this.form.genero
        this.items[id].descricao = this.form.descricao
        this.items[id].massa = this.form.massa
        this.items[id].data_nascimento = this.form.data_nascimento
        this.items[id].vacinas = this.form.vacinas

        this.dialog = false
        this.editMod = true

      },
      cadastrar() {
        let element = JSON.parse(JSON.stringify(this.form));
        element.id = this.currentId + 1
        this.items.push(element)
        this.dialog = false
      },
      deletar($event) {
        console.log(this.items[$event.id-1])
        if($event.value) {
          this.items.splice($event.id-1, 1)
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

      callDialogOcurrence(id) {
        this.dialogOcurrence = true
        this.dialogAnimal = id
      }

    },
    created() {
      console.log(mydb)
      this.headers.forEach(element=> {
        this.simpleHeadersText.push(element.text)
        this.simpleHeadersValue.push(element.value)
      })
    }
  }
</script>
