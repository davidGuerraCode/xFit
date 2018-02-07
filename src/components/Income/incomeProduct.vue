<template lang="pug">
  v-content
    v-container(fluid)
      v-card(v-if="showTable")
        v-card-title 
          h4(class="light-blue--text") Tabla de Ingresos
          v-spacer
          v-text-field(
            append-icon="search"
            label="Buscar"
            single-line
            hide-details
            v-model="search"
          )
        v-data-table(
          :headers="headers"
          :items="items"
          :rows-per-page-items= "rows"
          :search="search"
          expand
        )
          template(slot="items" scope="props")
            td(class="text-sm-center")
              v-edit-dialog(
                @open="tmp = props.item.cliente"
                @save="props.item.iron = tmp || props.item.cliente"
                large
                lazy
              )
                div {{ props.item.articulo }}
                div(slot="input" class="mt-3 title") Actualizar
                v-text-field(
                  slot="input"
                  label="Edit"
                  v-model="props.item.articulo"
                  single-line
                  counter
                  :rules="[max25Chars]"
                )
            td(class="text-xs-right") {{ props.item.precioVenta }}
            td(class="text-xs-right") {{ props.item.cantidadSeleccionada }}
            td(class="text-xs-right") {{ props.item.totalPagar }}
            td(class="text-xs-right") {{ props.item.tipoPago }}
            td(class="text-xs-right") {{ props.item.fechaVenta}}
      v-layout(justify-center)
        v-flex(md3)
          v-card(class="pa-2 mt-3 mr-2")
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
        v-btn(type="submit" @click.native.stop="consulta(fecha)" class="mt-3 white--text" color="light-blue") Consultar
      pre {{ items }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      search: '',
      tmp: '',
      showTable: false,
      menu: false,
      menu2: false,
      fecha: {
        desde: null,
        hasta: null
      },
      rows: [10, 15, 25],
      headers: [
        {
          text: 'Articulo',
          align: 'center',
          sortable: true,
          value: 'articulo'
        },
        { text: 'PrecioVenta/Ud (Bs)', value: 'precioVenta' },
        { text: 'Unidades', value: 'unidades' },
        { text: 'TOTAL (Bs)', value: 'total' },
        { text: 'Tipo Producto', value: 'tipoProducto' },
        { text: 'Fecha', value: 'fecha' }
      ],
      max25Chars: (v) => v.length <= 25 || 'El nombre es muy largo!'
    }
  },
  computed: {
    ...mapGetters({
      items: 'incomes/allSalesForProducts'
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
    consulta (fecha) {
      this.showTable = true
      this.$store.dispatch('incomes/getSaleForProduct', fecha)
    }
  },
  created () {
    // this.$store.dispatch('incomes/getSaleForProduct')
  }
}
</script>

