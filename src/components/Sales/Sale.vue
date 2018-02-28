<template lang="pug">
v-content
  v-container(fluid)
    //- Ventana modal donde se mostrara el carrito de compra
    v-layout(row justify-space-between)
      v-flex(xs12)
        v-dialog(v-model="dialog" persistent max-width="50%")
          v-btn(
            color="light-blue"
            slot="activator"
            dark
            @click="calculoTotalPrecioVenta(selected, valorElemento)"
            absolute
            style="bottom: 1rem"
            right
            bottom
            fab
            )
            v-icon shopping_cart
          v-card
            v-card-text
              v-container(grid-list-md)
                v-layout(row justify-center)
                  //- Aca se muestran los elementos seleccionados en los items de los productos, formulario que permitira terminar la compra
                  v-flex(xs12)
                      v-card
                        v-toolbar(class="light-blue" dark)
                          v-icon(class="white--text") add_shopping_cart
                          v-toolbar-title Carrito de Compra
                          v-spacer
                        v-list(two-line)
                          template( v-for="selec in selected")
                            v-list-tile()
                              v-list-tile-content
                                v-list-tile-title {{ selec.nombre }}
                                v-list-tile-sub-title {{ selec.items }}
                              v-list-tile-action
                                v-chip(class="primary white--text" color="light-blue")
                                  v-list-tile-title {{ costoUnidad }}
                                v-list-tile-sub-title {{ selec.tipoProducto }}
                          v-list-tile()
                            v-list-tile-action
                              div(class="text-xs-center")
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
        v-snackbar(
          :timeout="timeout"
          :color="color"
          top= true
          right= true
          v-model="snackbar"
        ) {{ text }}
    v-layout(row justify-space-between )
      v-flex(xs8 class="mr-3")
        template
          v-tabs(
            dark
            v-model="active"
            color="light-blue"
            show-arrows
            fixed-tabs
          )
            v-tabs-slider(class="teal accent-3")
            v-tab(
              v-for="tab in tabs"
              :key="tab"
              :href="'#' + tab"
              ripple
            )
              div(@click="itemMarcado(tab, $event)" style="width: 100% height: 100%" class="pt-2")
                | {{ tab }}
            v-tabs-items
              v-tab-item(
                v-for="tab in tabs"
                :key="tab"
                :id="tab"
              )
                v-card(flat)
                  v-container(fluid grid-list-lg)
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
                        template(slot="items" slot-scope="props")
                          tr(v-if="props.item.tipoProducto == tab")
                            td
                              v-checkbox(
                                color="light-blue"
                                hide-details
                                :disabled="isEqualsToCero(props.item.cantidad)"
                                v-model="props.selected"
                              )
                            td(class="text-xs-right") {{props.item.nombre}}
                            td(class="text-xs-right") {{props.item.cantidad}}
                            td(class="text-xs-right") {{props.item.precioVenta}}
                            td(class="text-xs-right px-2")
                              v-btn(flat id="menos" :disabled="isEqualsToCero(props.item.cantidad, props.item.items)" class="ma-0" icon color="light-blue" v-on:click="incrementArticulo(items, props.item.idArticulo,'decrement')")
                                v-icon() remove
                              span {{ props.item.items }}
                              v-btn(flat icon color="light-blue" :disabled="isEqualsToCero(props.item.cantidad)" class="ma-0" v-on:click="incrementArticulo(items, props.item.idArticulo,'increment')")
                                v-icon() add
      v-flex(xs4)
        v-card
          v-toolbar(class="light-blue" dark dense)
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
                      prepend-icon="face"
                      :rules="[v => !!v || 'El nombre del comprador es requerido']"
                      required
                      v-model="datosVenta.nombreComprador"
                      counter= true
                    )
                  v-flex(xs12)
                    v-text-field(
                      label="C.I"
                      type="number"
                      prepend-icon="fingerprint"
                      :rules="ciLength"
                      required
                      class="input-group"
                      v-model="datosVenta.cedulaComprador"
                    )
                  v-flex(xs12)
                    v-select(
                      label="Método de Pago"
                      hide-details
                      v-model="datosVenta.tipoPago"
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
                      :nudge-right="40"
                      max-width="290px"
                      min-width="290px"
                    )
                      v-text-field(
                        slot="activator"
                        label="Fecha de venta"
                        class="input-group mt-3"
                        v-model="datosVenta.fechaVenta"
                        prepend-icon="event"
                        readonly
                      )
                      v-date-picker(
                        v-model="datosVenta.fechaVenta"
                        @input="datosVenta.fechaVenta = formatDate($event)"
                        :allowed-dates="allowedDates"
                        no-title
                        autosave
                        scrollable
                        actions
                      )
                        template(slote-scope="{ save, cancel }")
                          v-card-actions
                            v-spacer
                            v-btn(flat color="error" @click="cancel") Cancel
                            v-btn(flat color="primary" @click="save") OK
    pre {{ datosVenta }}
</template>

<script>
import * as moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  name: 'sales',
  data () {
    return {
      valid: true,
      valor: 4,
      snackbar: false,
      color: 'teal accent-4',
      mode: '',
      costoUnidad: null,
      timeout: 5000,
      text: 'La venta fué registrada con exito!',
      allowedDates: [ moment().format('YYYY-MM-DD') ],
      tabs: ['Suplementos', 'Vestimenta', 'Cafetín', 'Equipos Deportivos'],
      // Acá se almacenan los valores del select para el metedo de pago
      metodosPago: [
        { text: 'Debito' },
        { text: 'Credito' },
        { text: 'Efectivo' },
        { text: 'Mixto' }
      ],
      ciLength: [
        v => !!v || 'La cédula es requerida.',
        v =>
          (!!v && v.length >= 7) ||
          'La cédula debe tener por lo menos 7 caracteres.',
        v =>
          (!!v && v.length <= 8) ||
          'La cédula no puede tener más de 8 caracteres'
      ],
      tipoPago: '',
      menu: false,
      active: null,
      // Variables que almacenan valores de los elementos en el carrito de compras
      valorElemento: [],
      cantidadElemento: [],
      totalPagar: 0,
      // Valor que almacena la cantidad de articulos por productos
      cantidadArticulos: 0,
      search: '',
      // Varibles del formulario
      datosVenta: {
        fechaVenta: null,
        nombreComprador: '',
        cedulaComprador: '',
        tipoPago: ''
      },
      // Variable de la ventana modal
      dialog: false,
      alert: false,
      selected: [],
      // Variable que almacena el elemento seleccionado en los items, valor que agrega la funcion itemMarcado
      filtrarItem: {},
      // text: 'Acá van los elementos a seleccionar para la venta.',
      products: {},
      headers: [
        {
          text: '',
          align: 'center',
          sortable: true,
          value: 'nombre'
        },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Cantidad Disponible', value: 'cantidad' },
        { text: 'Precio', value: 'precioReferencia' },
        { text: 'Items', value: 'items' }
      ]
    }
  },
  methods: {
    formatDate (date) {
      if (!date) {
        return null
      }

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    submit () {
      if (this.$refs.form.validate()) {
        this.newSale()
      }
    },
    clear () {
      this.$refs.form.reset()
    },
    next () {
      this.active = this.tabs[(this.tabs.indexOf(this.active) + 1) % this.tabs.length]
    },
    isEqualsToCero (cantidad, items) {
      if (parseInt(items) > 0) {
        return false
      }
      if (parseInt(cantidad) === 0 || parseInt(items) === 0) {
        return true
      }
    },
    itemMarcado (tabMarcado, event) {
      // now we have access to the native event
      if (event) event.preventDefault()
      this.filtrarItem = tabMarcado
    },
    incrementArticulo (items, id, opcion) {
      items.map((item) => {
        if (item.idArticulo === id && opcion === 'increment') {
          item.cantidad--
          item.items++
        } else if (item.idArticulo === id && opcion === 'decrement') {
          item.cantidad++
          item.items--
        }
      })
    },
    createArticle (selectedArticles, newFields) {
      let articles = []
      selectedArticles.map(article => {
        articles.push({
          nombre: article.nombre,
          items: article.items,
          precioVenta: article.precioVenta,
          idArticulo: article.idArticulo,
          tipoPago: newFields.tipoPago,
          fechaVenta: newFields.fechaVenta
        })
      })
      let newArticle = {
        infoCliente: {
          nombreComprador: newFields.nombreComprador,
          cedulaComprador: newFields.cedulaComprador
        },
        articulos: articles
      }
      return newArticle
    },
    addArticlesSaled (newArticles) {
      this.$store.dispatch('sales/addArticlesSaled', newArticles)
    },
    newSale () {
      this.addArticlesSaled(this.createArticle(this.selected, this.datosVenta))
      this.updateProduct(this.selected)
      this.snackbar = true
      this.dialog = false
      this.clear()
    },
    updateProduct (product) {
      this.$store.dispatch('sales/updateProduct', product)
    },
    calculoTotalPrecioVenta (selected, valorElemento) {
      valorElemento.length = 0

      let totalPrecioVenta = selected.map((val) => {
        let resultado = this.$numbers.totalSalePrice(val.precioVenta, val.items)

        valorElemento.push(this.$numbers.numberWithDots(resultado))
        this.costoUnidad = resultado

        return valorElemento
      })
      return this.calculoTotalPagar(...totalPrecioVenta)
    },
    calculoTotalPagar (totalPrecioVenta) {
      this.totalPagar = 0

      const total = this.$numbers.addArrayOfNumbers(totalPrecioVenta)

      this.totalPagar = total
    }
  },
  computed: {
    ...mapGetters({
      items: 'sales/allInventary'
    })
  },
  created () {
    this.$store.dispatch('sales/getInventary')
  }
}
</script>

<style>

</style>
