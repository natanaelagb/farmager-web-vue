<template>
  <v-container
    id="regular-tables-view"
    fluid
    tag="section"
  >
    <view-intro
      heading="Gerenciar Funcionários"
    />

    <material-card
      icon="mdi-clipboard-text"
      icon-small
      title="Funcionários Cadastrados"
      color="accent"
    >
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
            {{props.item.country}}
          </td>
          <td class="text-start">
            {{props.item.city}}
          </td>
          <td class="text-start">
            {{props.item.salary}}
          </td>
        </tr>
      </template>
      
          
      </v-data-table>
    </material-card>

  </v-container>
</template>

<script>
  export default {
    name: 'GerenciarFuncionarios',
    data: ()=>{
      return {
        headers:[
          {text:'Id', value: 'id'},
          {text:'Name', value: 'name'},
          {text:'Country', value: 'country'},
          {text:'City', value: 'city'},
          {text:'Salary', value: 'salary'}
        ],
        items: [
          {id:1, name:'Natanael Aguilar Barreto', country:'Brasil', city:'Montes Claros', salary:30000},
          {id:1, name:'Natanael Aguilar Barreto', country:'Brasil', city:'Montes Claros', salary:30000},
          {id:1, name:'Natanael Aguilar Barreto', country:'Brasil', city:'Montes Claros', salary:30000},
          {id:1, name:'Natanael Aguilar Barreto', country:'Brasil', city:'Montes Claros', salary:30000},
          {id:1, name:'Natanael Aguilar Barreto', country:'Brasil', city:'Montes Claros', salary:30000},
          {id:1, name:'Natanael Aguilar Barreto', country:'Brasil', city:'Montes Claros', salary:30000},
          {id:1, name:'Natanael Aguilar Barreto', country:'Brasil', city:'Montes Claros', salary:30000},
          {id:1, name:'Natanael Aguilar Barreto', country:'Brasil', city:'Montes Claros', salary:30000},
        ]
      }
    }
  }
</script>
