<template>
  <v-container
    id="regular-tables-view"
    fluid
    tag="section"
  >
    <view-intro
      heading="Gerenciar Funcionários"
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
              Cadastrar Funcionarios
            </h2>
            
          
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{storeMod ? "Cadastrar" : "Atualizar"}} Usuário</span>
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
                      label="Nome*"
                      v-model="form.name"
                      hint="Fulano de Tal"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      label="Email*"
                      v-model="form.email"
                      hint="fulano@gmail.com"
                      required
                      type="email"
                      validate-on-blur
                    ></v-text-field>
                  </v-col>

                  <v-col
                    v-if="storeMod"
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      label="Senha*"
                      v-model="form.password"
                      hint="admin"
                      required
                      type="password"
                      
                    ></v-text-field>
                  </v-col>


                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-select
                      label="Cargo*"
                      v-model="form.occupation"
                      :items="cargos"
                      required
                    ></v-select>
                  </v-col>

                  <v-col 
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      label="Salario"
                      v-model="form.salary"
                      hint="2000.00R$"
                      type="number"
                      step="0.1"
                      min="0"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col 
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-select
                      label="Privilégios"
                      v-model="form.is_admin"
                      hint="Admin"
                      :items="[{text:'Master', value: 1},{text:'Normal', value: 0}]"
                      required
                    ></v-select>
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

      <FiltrarBusca :headers="headers"  @exportar-dados="exportarDados" @filtrar-busca="filtrarBusca($event)" @limpar-busca="get()"></FiltrarBusca>

      <v-data-table
      :fixed-header="true"
      :headers="headers"
      :items="items"
      :items-per-page="5"
      >
      <template #item="props">
        <tr>
          <td class="text-start">
            {{props.item.id}}
          </td>
          <td class="text-start">
            {{props.item.name}}
          </td>
          <td class="text-start">
            {{props.item.email}}
          </td>
          <td class="text-start">
            {{props.item.occupation}}
          </td>
          <td class="text-start">
            {{props.item.salary}}
          </td>

          <td class="text-start">
            {{props.item.is_admin ? "Master" : "Normal"}}
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

      <ConfirmDialog :dialog="dialogConfirm" :id="dialogId" @confirm-event="deletar($event)"></ConfirmDialog>


    </v-card>

  </v-container>
</template>

<script>
  // import mydb from "@/store/fakeDB.js"
  import FiltrarBusca from '../components/FiltrarBusca.vue'
  import ConfirmDialog from '../components/ConfirmDialog.vue'
  import {vm} from "@/main.js"
  export default {
    name: 'GerenciarFuncionarios',
    components: {
      FiltrarBusca,
      ConfirmDialog,
    },
    data: ()=>{
      return {
        cargos: [
          {text:'Gerente', value:'Gerente'}, 
          {text:'Administrador', value:'Administrador'}, 
          {text:'Funcionario', value:'Funcionario'},
        ],
        headers:[
          {text:'Id', value: 'id'},
          {text:'Nome', value: 'name'},
          {text:'Email', value: 'email'},
          {text:'Cargo', value: 'occupation'},
          {text:'Salário', value: 'salary'},
          {text:'Privilégios', value: 'is_admin'},
          {text:"Acoes"}

        ],
        simpleHeadersText: [],
        simpleHeadersValue: [],
        items: [],
        form: {
          id:"",
          name:"",
          email:"",
          password:"",
          occupation: "",
          salary: "",
          is_admin:""
        },
        storeMod: true,
        dialog: false,
        dialogConfirm: false,
        dialogId: 0,
      }
    },
    methods: {
      editar(element) {
        this.storeMod = false
        
        this.form.id = element.id
        this.form.name = element.name
        this.form.email = element.email
        this.form.occupation = element.occupation
        this.form.salary = element.salary
        this.form.is_admin = element.is_admin

        this.dialog = true

      },
      fechar() {
        this.dialog = false; 
        this.storeMod = true;
        this.form =  {
          id:"",
          name:"",
          email:"",
          password:"",
          occupation: "",
          salary: "",
          is_admin: ""
        }
      },
      atualizar() {
        console.log(this.form)
        this.form.is_admin = this.form.is_admin ? true : false
        this.$http.post("users/"+this.form.id+"/update",this.form).then(response => {
          this.get()
        }, error => {
          console.log("🚀 ~ file: GerenciarFuncionarios.vue:306 ~ this.$http.post ~ error", error)
        })

        this.fechar()  

      },
      cadastrar() {
        console.log(this.form)
        this.form.is_admin = this.form.is_admin ? true : false
        this.form.password = ""
        this.$http.post("users", this.form).then(response => {
            console.log("🚀 ~ file: GerenciarFuncionarios.vue:311 ~ this.$http.post ~ response", response)
            this.items.push(response.data)
        	}, error => {
        	console.log("🚀 ~ file: GerenciarFuncionarios.vue:314 ~ this.$http.post ~ error", error)
        	}
        )

        this.fechar()
      },
      deletar($event) {
        if($event.value) {
          this.$http.delete('users/'+$event.id).then(response => {
              this.items = response.data.users
            },  error => {
              console.log("🚀 ~ file: GerenciarFuncionarios.vue:332 ~ this.$http.delete ~ error", error)
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
        console.log("GerenciarProdutos")
        for (let index = 0; index < this.items.length; index++) {
          let el = [];
          this.simpleHeadersValue.slice(0,-1).forEach(field=>{
            el.push(this.items[index][field])
          } )

          dados.push(el)
        }
        console.log(dados)

        vm.$emit("ExportarPDF", "gerenciar_funcionarios",this.simpleHeadersText.slice(0,-1), dados)
      },

      filtrarBusca(event) {
        this.$http.post("users-filter", event).then( response => {
          this.items = response.data.users
          console.log("🚀 ~ file: GerenciarAnimais.vue:441 ~ this.$http.post ~ response", response)  
        }, error => {
          console.log("🚀 ~ file: GerenciarAnimais.vue:443 ~ this.$http.post ~ error", error)
        })
      },

      get() {
        this.$http.get('users').then(response => {
          console.log("🚀 ~ file: GerenciarFuncionarios.vue:327 ~ this.$http.get ~ response", response)
          this.items = response.data.users
        }, error => {
          console.log("🚀 ~ file: GerenciarFuncionarios.vue:330 ~ this.$http.get ~ error", error)
        })
      },

    },
    created() {
     console.log(mydb)
     this.headers.forEach(element=> {
        this.simpleHeadersText.push(element.text)
        this.simpleHeadersValue.push(element.value)
      })

      this.get()
    }
  }
</script>
