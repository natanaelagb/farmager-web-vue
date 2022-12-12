<template>
  <v-container
    id="regular-tables-view"
    fluid
    tag="section"
  >
    <view-intro
      heading="Gerenciar Estoque"
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
              Cadastrar Produto
            </h2>
            
          
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{storeMod ? "Cadastrar" : "Atualizar"}} Produto</span>
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
                      label="Produto*"
                      v-model="form.description"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      label="Estoque Atual*"
                      v-model="form.amount"
                      hint="10 Unidades"
                      required
                      type="number"
                      min="0"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-autocomplete
                      label="Unidade*"
                      v-model="form.unit"
                      :items="unidades"
                      hint="Litro"
                      required

                    ></v-autocomplete>
                  </v-col>


                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      label="Preço Unitário"
                      v-model="form.unit_price"
                      type="number"
                      step="0.1"
                    ></v-text-field>
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

      <FiltrarBusca :headers="headers" @exportar-dados="exportarDados"></FiltrarBusca>

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
            {{props.item.description}}
          </td>
          <td class="text-start">
            {{props.item.amount}}
          </td>
          <td class="text-start">
            {{props.item.unit}}
          </td>
          <td class="text-start">
            {{props.item.unit_price}}
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
    name: 'GerenciarEstoque',
    components: {
      FiltrarBusca,
      ConfirmDialog,
    },
    data: ()=>{
      return {
        headers:[
          {text:'ID', value: 'id'},
          {text:'Produto', value: 'description'},
          {text:'Estoque Atual', value: 'amount'},
          {text:'Unidade', value: 'unit'},
          {text:'Preço Unitário', value: 'observacao'},
          {text:"Acoes"}
        ],
        units: [],
        simpleHeadersText: [],
        simpleHeadersValue: [],
        items: [],
        form: {
          id:"",
          description:"",
          amount:"",
          unit:"",
          unit_price: "",
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
        this.form.description = element.description
        this.form.amount = element.amount
        this.form.unit = element.unit
        this.form.unit_price = element.unit_price

        this.dialog = true

      },
      fechar() {
        this.dialog = false; 
        this.storeMod = true;
        this.form =  {
          id:"",
          description:"",
          amount:"",
          unit:"",
          unit_price: "",
        }
      },
      atualizar() {
        console.log(this.form)
        this.$http.post("products/"+this.form.id+"/update",this.form).then(response => {
          this.get()
        }, error => {
          console.log("🚀 ~ file: GerenciarEstoque.vue:264 ~ this.$http.post ~ error", error)
        })

        this.fechar() 

      },
      cadastrar() {
        console.log(this.form)
        this.$http.post("products", this.form).then(response => {
            console.log("🚀 ~ file: GerenciarEstoque.vue:276 ~ this.$http.post ~ response", response)
            this.items.push(response.data)
        	}, error => {
        	console.log("🚀 ~ file: GerenciarEstoque.vue:279 ~ this.$http.post ~ error", error)
        	}
        )

        this.fechar()
      },
      deletar($event) {
        if($event.value) {
          this.$http.delete('products/'+$event.id).then(response => {
              this.items = response.data.products
            },  error => {
              console.log("🚀 ~ file: GerenciarEstoque.vue:287 ~ this.$http.delete ~ error", error)
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
        console.log("GerenciarEstoque")
        for (let index = 0; index < this.items.length; index++) {
          let el = [];
          this.simpleHeadersValue.slice(0,-1).forEach(field=>{
            el.push(this.items[index][field])
          } )

          dados.push(el)
        }
        console.log(dados)

        vm.$emit("ExportarPDF", "gerenciar_estoque",this.simpleHeadersText.slice(0,-1), dados)
      },
      get() {
        this.$http.get('products').then(response => {
          console.log("🚀 ~ file: GerenciarEstoque.vue:307 ~ this.$http.get ~ response", response)
          this.items = response.data.products
        }, error => {
          console.log("🚀 ~ file: GerenciarEstoque.vue:310 ~ this.$http.get ~ error", error)
        })
      },

    },
    computed: {
      animais_cadastrados() {
        let items = []
        mydb.animais.forEach(element=> {
          items.push(element.id)
        })
        
        return items
      },
      unidades() {
        return window.DB_unidades;
      }
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
