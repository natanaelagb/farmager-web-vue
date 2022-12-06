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
              <span class="text-h5">{{editMod ? "Cadastrar" : "Atualizar"}} Produto</span>
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
                      v-model="form.produto"
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
                      v-model="form.quantidade"
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
                      v-model="form.unidade"
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
                      v-model="form.preco_unitario"
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
      :items-per-page="5"
      >
      <template #item="props">
        <tr>
          <td class="text-start">
            {{props.item.id}}
          </td>
          <td class="text-start">
            {{props.item.produto}}
          </td>
          <td class="text-start">
            {{props.item.quantidade}}
          </td>
          <td class="text-start">
            {{props.item.unidade}}
          </td>
          <td class="text-start">
            {{props.item.preco_unitario}}
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
        unidades: [
          {text:'Kg', value:'Kg'}, 
          {text:'Litro', value:'Litro'}, 
          {text:'Unidade', value:'Unidade'},
        ],
        headers:[
          {text:'ID', value: 'id'},
          {text:'Produto', value: 'produto'},
          {text:'Estoque Atual', value: 'quantidade'},
          {text:'Unidade', value: 'unidade'},
          {text:'Preço Unitário', value: 'observacao'},
          {text:"Acoes"}
        ],
        simpleHeadersText: [],
        simpleHeadersValue: [],
        items: 
          mydb.produtos
        ,
        form: {
          id:"",
          produto:"",
          quantidade:"",
          unidade:"",
          preco_unitario: "",
        },
        editMod: true,
        dialog: false,
        currentId: 4, 
        callDialog: false,
        dialogId: 0,
      }
    },
    methods: {
      editar(element) {
        this.editMod = false
        
        this.form.id = element.id
        this.form.produto = element.produto
        this.form.quantidade = element.quantidade
        this.form.unidade = element.unidade
        this.form.preco_unitario = element.preco_unitario

        this.dialog = true

      },
      fechar() {
        this.dialog = false; 
        this.editMod = true;
        this.form =  {
          id:"",
          produto:"",
          quantidade:"",
          unidade:"",
          preco_unitario: "",
        }
      },
      atualizar() {
        let id = this.form.id -1
        console.log(this.items[id], this.form)

        this.items[id].produto = this.form.produto
        this.items[id].quantidade = this.form.quantidade
        this.items[id].unidade = this.form.unidade
        this.items[id].preco_unitario = this.form.preco_unitario

        this.fechar()

      },
      cadastrar() {
        let element = JSON.parse(JSON.stringify(this.form));
        element.id = this.currentId + 1
        this.items.push(element)
        this.fechar()
      },
      deletar($event) {

        console.log(this.items[$event.id-1])
        if($event.value) {
          this.items.splice($event.id-1, 1)
        }
        this.callDialog = false
      },
      confirmar(id) {
        this.dialogId = id
        this.callDialog = true
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
      }

    },
    computed: {
      animais_cadastrados() {
        let items = []
        mydb.animais.forEach(element=> {
          items.push(element.id)
        })
        
        return items
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
