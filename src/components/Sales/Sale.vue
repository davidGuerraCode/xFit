<template lang="pug">
  v-container(fluid)
    //- Ventana modal donde se mostrara el carrito de compra
    v-dialog(v-model="dialog" persistent width="50%")
      v-btn( primary dark slot="activator") Carrito de Compra
      v-card
        v-card-text
          v-container(grid-list-md)
            //- Aca se muestran los elementos seleccionados en los items de los productos, formulario que permitira terminar la compra  
            v-flex(xs6)
                v-card
                  v-toolbar(class="white--text blue" dark)
                    v-icon add_shopping_cart
                    v-toolbar-title Carrito de Compra  
                    v-spacer
                    v-btn(icon)
                      v-icon search
                    v-btn(icon)
                      v-icon check_circle
                  v-list(two-line) 
                    template( v-for="selec in selected")
                      v-list-tile(avatar ripple @click="")
                        v-list-tile-content
                          v-list-tile-title {{ selec.nombre }}
                          //- v-list-tile-sub-title(class="grey--text text--darken-4") {{ selec.precioCompra }}
                          v-list-tile-sub-title {{ selec.cantidad }}
                        v-list-tile-action
                          v-chip(class="primary white--text")
                            v-list-tile-title {{ selec.costoUnidad }}
                          v-list-tile-sub-title {{ selec.tipoProducto }}
                    v-list-tile()
                      v-list-tile-action
                        div(class="text-xs-center")
                          //- v-chip(label)
                          //-   |Monto a pagar:
                          v-text-field(
                            name="input-1"
                            label="Mostrar Monto"
                            id="testing"
                            v-model="totalPagar"
                            disabled
                          )
        v-card-actions
          v-spacer
          v-btn(class="blue--text darken-1" flat @click.native="dialog = false") Cerrar
          v-btn(class="blue--text darken-1" flat @click.native="newSale()" type="submit") Guardar

    v-layout(row wrap justify-space-between)
      v-flex(xs6)
        v-tabs(dark v-model="active")
            v-tabs-bar(slot="activators" class="cyan")
                v-tabs-item(
                v-for="tab in tabs"
                :key="tab"
                :href="'#' + tab"
                ripple)
                    div(@click="itemMarcado(tab, $event)" style="width: 100%; height: 100%" class="pt-3")
                      |{{ tab }}
                v-tabs-slider(class="yellow")
            v-tabs-content(
                v-for="tab in tabs"
                :key="tab"
                :id="tab"
            )
                v-card(flat) 
                    v-card-text 
                      v-data-table(
                          v-bind:headers="headers"
                          :items="items"
                          hide-actions
                          v-bind:search="search"
                          v-model="selected"
                          selected-key="nombre"
                          class="elevation-1"
                          v-if="tab == filtrarItem")
                          template(slot="items" scope="props")
                            tr(v-if="props.item.tipoProducto == tab")
                              td
                                v-checkbox(primary hide-details v-model="props.selected")
                              td {{props.item.nombre}}
                              td(class="text-xs-center") {{props.item.cantidad}}
                              td(class="text-xs-center") {{props.item.costoUnidad}}
      v-flex(xs6)
        v-card
          v-toolbar(class="white--text blue" dark)
            v-icon add_shopping_cart
            v-toolbar-title Datos de la Venta  
            v-spacer
            v-btn(icon)
              v-icon search
          main
            v-container(fluid class="px-3")
              form(@submit.prevent="newSale()")
                v-layout(row wrap)
                  v-flex(xs12)
                    v-text-field(
                      label="Nombre Comprador"
                      class="input-group--focused"
                      v-model="nombreComprador"
                      counter= true
                    )
                  v-flex(xs12)
                    v-text-field(
                      label="C.I"
                      class="input-group--focused"
                      v-model="cedulaComprador"
                    )
                  v-flex(xs12)
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
                        label="Fecha de venta"
                        class="input-group"
                        v-model="fechaVenta"
                        prepend-icon="event" 
                        readonly
                      )
                      v-date-picker(
                        v-model="fechaVenta" 
                        no-title 
                        scrollable actions
                        autosave)
                        template(scope="{ save, cancel }")
                          v-card-actions
                            v-btn(flat primary @click.native="cancel()") Cancelar
                            v-btn(flat primary @click.native="save()") Guardar
</template>

<script>
// import {conexref} from '@/assets/firebase'
// import {productsRef} from '@/assets/dbAtreusFit.js'

export default {
  data () {
    return {
      tabs: ['Suplementos', 'Vestimenta', 'Cafetín', 'Equipos Deportivos'],
      menu: false,
      active: null,
      // Variables que almacenan valores de los elementos en el carrito de compras
      valorElemento: [],
      totalPagar: 0,
      //
      search: '',
      // Varibles del formulario
      fechaVenta: '',
      nombreComprador: '',
      cedulaComprador: '',
      // Variable de la ventana modal
      dialog: false,
      selected: [],
      // Variable que almacena el elemento seleccionado en los items, valor que agrega la funcion itemMarcado
      filtrarItem: {},
      text: 'Acá van los elementos a seleccionar para la venta.',
      products: {},
      headers: [{
        text: '',
        align: 'left',
        sortable: true,
        value: 'nombre'
      },
      { text: 'Nombre', value: 'nombre' },
      { text: 'Cantidad', value: 'cantidad' },
      { text: 'Costo x Unidad', value: 'costoUnidad' }
      ]
    }
  },
  methods: {
    next () {
      this.active = this.tabs[(this.tabs.indexOf(this.active) + 1) % this.tabs.length]
    },
    itemMarcado: function (tabMarcado, event) {
      // now we have access to the native event
      if (event) event.preventDefault()
      this.filtrarItem = tabMarcado
    },
    newSale () {
      const value = {
        fechaVenta: this.fechaVenta,
        nombreComprador: this.nombreComprador,
        cedulaComprador: this.cedulaComprador,
        selectedArticles: this.selected
      }
      console.log('venta cargada con exito')
      this.$store.dispatch('addSale', value)
    }
  },
  watch: {
    selected (value) {
      this.valorElemento.length = 0
      for (let valor in value) {
        this.valorElemento.push(parseFloat(value[valor].costoUnidad))
      }
      this.totalPagar = 0
      for (let costo in this.valorElemento) {
        this.totalPagar = parseFloat(this.totalPagar) + parseFloat(this.valorElemento[costo])
      }
    }
  },
  computed: {
    items () {
      return this.$store.getters.allInventary
    }
  },
  created () {
    this.$store.dispatch('getInventary')
  }
}
</script>

<style>
	
</style>
