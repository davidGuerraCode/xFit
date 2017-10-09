<template lang="pug">
  v-container(fluid)
    v-layout(justify-center)
      v-card
        v-card-title(primary-title)
          h3(class="teal--text text--accent-4") Gastos
        div(class="card-content" id="listaProductos")
            v-data-table(
                v-bind:headers="headers"
                :items="items"
                hide-actions
                class="elevation-1")
              template(slot="items" scope="props")
                  td {{props.item.tipoGasto}}
                  td(class="text-xs-center") {{props.item.subClasificacion}}
                  td(class="text-xs-center") {{props.item.cantidad}}
                  td(class="text-xs-center") {{props.item.acreedorPago}}
                  td(class="text-xs-center") {{props.item.fechaPago}}
                  td(class="text-xs-center") {{props.item.descripcion}}

</template>

<script>
// import {conexref} from '@/assets/firebase'
// import {expensesRef} from '@/assets/dbAtreusFit.js'
// import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      headers: [{
        text: 'Tipo Gasto',
        align: 'center',
        sortable: false,
        value: 'tipoGasto'
      },
      { text: 'Subclasificación', value: 'subClasificacion' },
      { text: 'Cantidad', value: 'cantidad' },
      { text: 'Acreedor', value: 'acreedorPago' },
      { text: 'Fecha de Pago', value: 'fechaPago' },
      { text: 'Descripción', value: 'descripcion' }
      ]
    }
  },
  computed: {
    items () {
      return this.$store.getters.allExpenses
    }
  },
  created () {
    this.$store.dispatch('getExpenses')
  }
}
</script>

<style>
	
</style>
