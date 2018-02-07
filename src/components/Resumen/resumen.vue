<template lang="pug">
  v-content
    v-container(fluid)
      v-layout(justify-space-between)
        v-flex(xs9 class="mr-2" d-flex)
          v-card(color="white")
            v-card-title
              h3(class="light-blue--text") Resumen
              v-spacer
              v-menu(bottom left class="pb-4")
                v-btn(icon slot="activator" dark)
                  v-icon more_vert
            v-layout(row)
              v-flex(xs3)
                p(class="grey--text text--darken-1 text-xs-center") Hoy
                h5(class="grey--text text--darken-2 text-xs-center") {{ cantidadHoy | total }}Bs
              v-flex(xs3)
                p(class="grey--text text--darken-1 text-xs-center") Ayer
                h5(class="grey--text text--darken-2 text-xs-center") {{ cantidadAyer | total }}Bs
              v-flex(xs3)
                p(class="grey--text text--darken-1 text-xs-center") Últimos 7 dias
                h5(class="grey--text text--darken-2 text-xs-center") {{ cantidadHaceUnaSemana | total }}Bs
              v-flex(xs3)
                p(class="grey--text text--darken-1 text-xs-center") Este mes
                h5(class="grey--text text--darken-2 text-xs-center") {{ cantidadHaceUnMes | total }}Bs
        v-flex(xs3 d-flex)
          v-card(color="white")
            v-card-title
              h3(class="light-blue--text text-xs-center") Balance
              v-spacer
              v-menu(bottom left class="pb-4")
                v-btn(icon slot="activator" dark )
                  v-icon more_vert
            v-layout(row)
              v-flex()
                h4(class="white--text text-xs-center") 150.000bs
    //- pre {{ cantidadHoy }}
    pre {{ cantidadHaceUnMes }}
</template>
<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    cantidadHoy () {
      return this.$store.getters.allResumen
    },
    cantidadAyer () {
      return this.$store.getters.allResumenAyer
    },
    cantidadHaceUnaSemana () {
      return this.$store.getters.allResumenWeekAgo
    },
    cantidadHaceUnMes () {
      return this.$store.getters.allResumenMonthAgo
    }
  },
  filters: {
    total (val) {
      let resultado = 0
      for (let item in val) {
        resultado += val[item].totalPagar
      }
      const numberWithDots = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      }
      return numberWithDots(resultado)
    }
  },
  created () {
    this.$store.dispatch('getResumen')
    this.$store.dispatch('getResumenAyer')
    this.$store.dispatch('getResumenWeekAgo')
    this.$store.dispatch('getResumenMonthAgo')
  }
}
</script>
<style scoped>

</style>
