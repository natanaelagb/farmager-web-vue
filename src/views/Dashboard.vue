<template>
  <v-container
    id="dashboard-view"
    fluid
    tag="section"
  >
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col
            v-for="(chart, i) in charts"
            :key="`chart-${i}`"
            cols="12"
            md="6"
            lg="6"
          >
            <material-chart-card
              :color="chart.color"
              :data="chart.data"
              :options="chart.options"
              :responsive-options="chart.responsiveOptions"
              :title="chart.title"
              :type="chart.type"
            >
              <template #subtitle>
                <div class="font-weight-light text--secondary">
                  <div v-html="chart.subtitle" />
                </div>
              </template>

              <template #actions>
                <v-icon
                  class="mr-1"
                  small
                >
                  mdi-clock-outline
                </v-icon>

                <span
                  class="text-caption grey--text font-weight-light"
                  v-text="chart.time"
                />
              </template>
            </material-chart-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        v-for="({ ...attrs }, i) in stats"
        :key="i"
        cols="12"
        md="6"
        lg="3"
      >
        <material-stat-card v-bind="attrs">
          <!-- <template #actions>
            <v-icon
              class="mr-2"
              small
              v-text="actionIcon"
            />
            <div class="text-truncate">
              {{ actionText }}
            </div>
          </template> -->
        </material-stat-card>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <material-card
          color="primary"
          full-header
        >
          <template #heading>
            <div class="pa-8 white--text d-flex">
              <v-icon
                x-large
                >
                  mdi-barn
              </v-icon>
              <div class="text-h4 font-weight-light mt-3 ms-3" >
               
                Ultimos Recursos Produzidos
              </div>
              <!-- <div class="text-caption">
                New employees on 15th September, 2016
              </div> -->
            </div>
          </template>
          <v-card-text>
            <v-data-table
              :headers="headersProductions"
              :items="itemsProductions"
              sort-by="created_at"
              sort-desc

            >
            <template #item="props">
              <tr>
                <td class="text-start">
                  {{props.item.animal_id}}
                </td>
                <td class="text-start">
                  {{props.item.product.description}}
                </td>
                <td class="text-start">
                  {{props.item.amount}}
                </td>
                <td class="text-start">
                  {{props.item.product.unit}}
                </td>
                <td class="text-start">
                  {{props.item.description}}
                </td>
                <td class="text-start">
                  {{$moment(props.item.created_at).utc().format("DD/MM/YYYY HH:mm:ss")}}
                </td>
              </tr>
            </template>

            </v-data-table>
          </v-card-text>
        </material-card>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <material-card
          color="red"
          full-header
        >
          <template #heading>
            <div class="pa-8 d-flex">
              <v-icon
                x-large
              >
                  mdi-alert-octagon
              </v-icon>
              <div class="text-h4 font-weight-light mt-3 ms-3  white--text" >
               
                Últimas Ocorrências Relatadas
              </div>
              <!-- <div class="text-caption">
                New employees on 15th September, 2016
              </div> -->
            </div>
          </template>
          <v-card-text>
            <v-data-table
              :headers="headersOcurrences"
              :items="itemsOcurrences"
              sort-by="created_at"
              sort-desc

            >
            <template #item="props">
              <tr>
                <td class="text-start">
                  {{props.item.animal_id}}
                </td>
                <td class="text-start">
                  {{props.item.description}}
                </td>
                <td class="text-start">
                  {{props.item.user.name}}
                </td>
                <td class="text-start">
                  {{$moment(props.item.created_at).utc().format("DD/MM/YYYY HH:mm:ss")}}
                </td>
              </tr>
            </template>

            </v-data-table>
          </v-card-text>
        </material-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'
  import Vue from 'vue'

  const lineSmooth = Vue.chartist.Interpolation.cardinal({
    tension: 0,
  })

  export default {
    name: 'DashboardView',

    data: () => ({
      charts: [{
        type: 'Bar',
        color: 'primary',
        title: 'Produções Semanal',
        time: 'Atualizado 1 minuto atrás',
        data: {
          labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
          series: [
            [542, 443, 320, 780, 553, 453, 326],
          ],
        },
        options: {
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
        responsiveOptions: [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0]
              },
            },
          }],
        ],
      }, {
        type: 'Line',
        color: 'success',
        title: 'Transações Semanal',
        time: 'Atualizado 1 minuto atrás',
        data: {
          labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
          series: [
            ['',230, 750, 450, 300, 280, 240],
          ],
        },
        options: {
          lineSmooth,
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      }],
      headersProductions:[
        {text:'ID Animal', value: 'animal_id'},
        {text:'Produto', value: 'product_id'},
        {text:'Quantidade', value: 'amount'},
        {text:'Unidade', value: 'product.unit', sortable:false},
        {text:'Observações', value: 'description', sortable:false, width:5},
        {text:'Data', value: 'created_at'},
      ],
      headersOcurrences:[
        {text:'ID Animal', value: 'animal_id'},
        {text:'Ocorrência', value: 'description'},
        {text:'Funcionário', value: 'user.name'},
        {text:'Data', value: 'created_at'},
      ],
      itemsProductions: [],
      itemsOcurrences: [],
      stats: [
        {
          color: '#FD9A13',
          icon: 'mdi-egg',
          title: 'Estoque Ovos (unidade)',
          value: '',
          item: 'Ovo'
        },
        {
          color: 'primary',
          icon: 'mdi-cow',
          title: 'Estoque Leite (litro)',
          value: '',
          item: 'Leite'
        },
        {
          color: 'success',
          icon: 'mdi-food-steak',
          title: 'Estoque Carne (kg)',
          value: '',
          item: 'Carne'
        },
        {
          color: 'success',
          icon: 'mdi-finance',
          title: 'Finâncias (R$)',
          value: '',
          item: 'Finance'
        },

      ],
      tabs: 0,
    }),

    computed: {

    },

    methods: {
      getProductions() {
        this.$http.get('productions-limit').then(response => {
          console.log("🚀 ~ file: Dashboard.vue:365 ~ this.$http.get ~ response", response)
          this.itemsProductions = response.data.productions
        }, error => {
        console.log("🚀 ~ file: Dashboard.vue:405 ~ this.$http.get ~ error", error)
        })
      },
      getOcurrences() {
        this.$http.get("animals-last-events").then(response => {
          console.log("🚀 ~ file: Dashboard.vue:372 ~ this.$http.get ~ response", response)
          this.itemsOcurrences = response.data.events
        }, error => {
          console.log("🚀 ~ file: Dashboard.vue:375 ~ this.$http.get ~ error", error)
        })
      },
      getInventory() {
        this.$http.get("products-inventory").then(response => {
          let inventory = response.data.inventory
          console.log("🚀 ~ file: Dashboard.vue:377 ~ this.$http.get ~ response", response)
          this.stats.forEach((element, index) => {
              element.value = String(inventory[element.item]);
          })
        }, error => {
          console.log("🚀 ~ file: Dashboard.vue:380 ~ this.$http.get ~ error", error)
        })
      },
      getDataProductions() {

      },
      getDataTransactions() {

      }
    },

    created() {
      this.getProductions()
      this.getOcurrences()
      this.getInventory()

      setInterval(()=>{
        if(this.$route.name == "Dashboard") {
          this.getProductions()
          this.getOcurrences()
          this.getInventory()
        }
      },10000)
    }
  }
</script>
