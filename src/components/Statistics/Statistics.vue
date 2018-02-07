<template lang="pug">
v-content
  v-container(fluid)
    v-layout(justify-space-between)
      v-layout(align-center)
        v-flex(md3)
          h3(class="light-blue--text") Estadísticas
      v-layout(justify-start)
        v-flex(md4)
          v-card()
            div(v-if="showChart" class="text-md-center light-blue--text pa-2")
              div(class="headline") Ingresos:
              h6(class="mt-2") {{ incomes }}
        v-flex(md4)
          v-card()
            div(class="text-md-center light-blue--text pa-2")
              div(class="headline") Gastos:
              h6(class="mt-2") 3.000.000
        v-flex(md5)
          v-card(class="mr-1")
            div(class="text-md-center light-blue--text pa-2")
              div(class="headline") Ganancias:
              h6(class="mt-2") 1.000.000
    v-layout(row)
      v-flex(xs12)
        v-card(v-if="showChart" class="mt-3 pa-2")
          chartStatistic(
            :chart-data= "dataCollection"
            :options="{responsive: true, maintainAspectRatio: false}"
            :height="500"
          )
    v-layout(justify-center)
      v-flex(md3)
        v-card(class="pa-2 mt-3")
          v-menu(
            lazy
            :close-on-content-click="false"
            v-model="menu"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-left="40"
            max-width="290px"
          )
            v-text-field(
              slot="activator"
              label="Desde"
              v-model="fecha.desde"
              class="input-group"
              prepend-icon="event"
              readonly
            )
            v-date-picker(
              v-model="fecha.desde"
              @input="fecha.desde = formatDate($event)"
              autosave
              no-title
              scrollable actions)
              template(scope="{ save, cancel }")
                v-card-actions
                  v-btn(flat color="error" @click.native="cancel()") Cancelar
                  v-btn(flat color="primary" @click.native="save()") Guardar
      v-flex(md3)
        v-card(class="pa-2 mt-3")
          v-menu(
            lazy
            :close-on-content-click="false"
            v-model="menu2"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-left="40"
            max-width="290px"
          )
            v-text-field(
              slot="activator"
              label="Hasta"
              v-model="fecha.hasta"
              class="input-group"
              prepend-icon="event"
              readonly
            )
            v-date-picker(
              v-model="fecha.hasta"
              @input="fecha.hasta = formatDate($event)"
              autosave
              no-title
              scrollable actions)
              template(scope="{ save, cancel }")
                v-card-actions
                  v-btn(flat color="error" @click.native="cancel()") Cancelar
                  v-btn(flat color="primary" @click.native="save()") Guardar
    v-layout(justify-center)
      v-btn(type="submit" @click.native.stop="consulta()" class="mt-3 light-blue white--text") Enviar
  pre {{ datos }}
</template>
<script>
import { mapGetters } from 'vuex'
import chartStatistic from '@/components/Charts/statisticsChart.js'

export default {
  components: { chartStatistic },
  data () {
    return {
      menu: false,
      menu2: false,
      valores: null,
      showChart: false,
      incomes: null,
      dataCollection: null,
      fecha: {
        desde: null,
        hasta: null
      }
    }
  },
  computed: {
    ...mapGetters({
      datos: 'statistics/allSalesForProducts'
    })
  },
  methods: {
    formatDate (date) {
      if (!date) {
        return null
      }

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    consulta () {
      const fecha = {
        desde: this.fecha.desde,
        hasta: this.fecha.hasta
      }
      this.$store.dispatch('statistics/getSaleForProduct', fecha).then(() => {
        this.fillData()
        this.getTotalIncomen(this.getData())
      })
    },
    getData () {
      const data = this.datos.map(dato => {
        return dato.totalPagar
      })

      return data
    },
    getTotal () {
      const reducer = (acc, currentItem) => {
        if (currentItem.fechaVenta === currentItem.fechaVenta) {
          return acc + currentItem.totalPagar
        }
        return currentItem.totalPagar
      }
      const data = this.datos.reduce(reducer, 0)
      console.log(data)
      return data
    },
    numberWithDots (number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    getDate () {
      const data = this.datos.map(dato => {
        return dato.fechaVenta
      })
      data.sort((a, b) => a - b)

      return data
    },
    fillData () {
      this.dataCollection = {
        labels: this.getDate(),
        datasets: [
          {
            label: 'Ingresos',
            borderColor: '#36a3f7',
            data: this.getTotal(),
            fill: false,
            lineTension: 0,
            // pointBackgroundColor: '#f4516c',
            pointBorderColor: '#f4516c',
            radius: 4
          }
        ]
      }
      this.showChart = true
    },
    getTotalIncomen (incomes) {
      const total = this.$numbers.addArrayOfNumbers(incomes)

      this.incomes = total
    }
  }
}
</script>

<style>

</style>
