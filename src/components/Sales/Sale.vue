<template lang="pug">
v-content
  v-container(fluid)
    //- Ventana modal donde se mostrara el carrito de compra
    v-layout(row justify-space-between)
      v-flex(xs12)
        v-dialog(v-model="dialog" persistent max-width="50%")
          v-btn(
            color="light-blue accent-4"
            slot="activator"
            dark
            absolute
            style="bottom: 1rem"
            right
            bottom
            fab
            )
            v-icon shopping_cart
          //- v-btn( color="primary" dark slot="activator") Carrito de Compra
          v-card
            v-card-text
              v-container(grid-list-md)
                v-layout(row justify-center)
                  //- Aca se muestran los elementos seleccionados en los items de los productos, formulario que permitira terminar la compra
                  v-flex(xs12)
                      v-card
                        v-toolbar(class="blue" dark)
                          v-icon(class="white--text") add_shopping_cart
                          v-toolbar-title Carrito de Compra
                          v-spacer
                        v-list(two-line)
                          template( v-for="selec in selected")
                            v-list-tile()
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
                                  label="Total a pagar"
                                  id="testing"
                                  v-model="totalPagar"
                                  disabled
                                )
            v-card-actions
              v-spacer
              v-btn(class="red--text darken-1" flat @click.native="dialog = false") Cerrar
              v-btn(class="blue--text darken-1" flat @click="submit") Guardar
      v-flex(xs6)
        v-alert(
          class="teal accent-4"
          icon="check_circle"
          dismissible
          v-model="alert"
          transition="slide-y-reverse-transition"
        )
          |Su compra fué registrada con exito.
    v-layout(row wrap justify-space-between )
      v-flex(xs7 )
        template
          v-tabs(dark v-model="active")
            v-tabs-bar(class="blue-grey darken-3")
              v-tabs-item(
                v-for="tab in tabs"
                :key="tab"
                :href="'#' + tab"
              )
                div(@click="itemMarcado(tab, $event)" style="width: 100%; height: 100%" class="pt-3")
                  | {{ tab }}
              v-tabs-slider(class="teal accent-4")
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
                      item-key="nombre"
                      v-bind:search="search"
                      v-model="selected"
                      selected-key="nombre"
                      class="elevation-1"
                      v-if="tab == filtrarItem")
                      template(slot="items" scope="props")
                        tr(v-if="props.item.tipoProducto == tab")
                          td
                            v-checkbox(
                              color="primary"
                              hide-details
                              v-model="props.selected"
                            )
                          td(class="text-xs-right") {{props.item.nombre}}
                          td(class="text-xs-right") {{props.item.cantidad}}
                          td(class="text-xs-right") {{props.item.costoUnidad}}
      v-flex(xs4)
        v-card
          v-toolbar(class="blue-grey darken-3" dark dense)
            v-icon(class="white--text") add_shopping_cart
            v-toolbar-title Datos de la Venta
          main
            v-container(fluid class="px-3")
              v-form(v-model="valid" ref="form" lazy-validation)
                v-layout(row wrap)
                  v-flex(xs12)
                    v-text-field(
                      label="Nombre Comprador"
                      class="input-group--focused"
                      :rules="[v => !!v || 'El nombre del comprador es requerido']"
                      required
                      v-model="nombreComprador"
                      counter= true
                    )
                  v-flex(xs12)
                    v-text-field(
                      label="C.I"
                      type="number"
                      :rules="ciLength"
                      required
                      class="input-group"
                      v-model="cedulaComprador"
                    )
                  v-flex(xs12)
                    v-select(
                      label="Método de Pago"
                      hide-details
                      v-model="tipoPago"
                      :rules="[v => !!v || 'Seleccione un método de pago']"
                      required
                      :items="metodosPago"
                      item-value="text"
                      auto
                      persistent-hint
                      prepend-icon="group_work"
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
                            v-btn(flat color="error" @click.native="cancel()") Cancelar
                            v-btn(flat color="primary" @click.native="save()") Guardar
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      tabs: ['Suplementos', 'Vestimenta', 'Cafetín', 'Equipos Deportivos'],
      // Acá se almacenan los valores del select para el metedo de pago
      metodosPago: [
        {text: 'Debito'},
        {text: 'Credito'},
        {text: 'Efectivo'},
        {text: 'Mixto'}
      ],
      ciLength: [
        (v) => !!v || 'La cédula es requerida.',
        (v) => !!v && v.length >= 7 || 'La cédula debe tener por lo menos 7 caracteres.'
      ],
      tipoPago: '',
      menu: false,
      active: null,
      // Variables que almacenan valores de los elementos en el carrito de compras
      valorElemento: [],
      totalPagar: 0,
      //
      search: '',
      // Varibles del formulario
      fechaVenta: null,
      nombreComprador: '',
      cedulaComprador: '',
      // Variable de la ventana modal
      dialog: false,
      alert: false,
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
    submit () {
      if (this.$refs.form.validate()) {
        this.newSale()
      }
    },
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
        selectedArticles: this.selected,
        metodoPago: this.tipoPago
      }
      console.log('venta cargada con exito')
      this.$store.dispatch('addSale', value)
      this.alert = true
      this.dialog = false
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
      // return this.$store.getters.allInventary
    }
  },
  created () {
    this.$store.dispatch('getInventary')
  }
}
</script>

<style>

</style>
