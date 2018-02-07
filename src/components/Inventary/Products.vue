<template lang="pug">
v-content
  v-container(fluid)
    v-layout(justify-center)
      v-card
        v-card-title(primary-title)
          div
            h3(class="light-blue--text") Productos
          v-spacer
          v-text-field(
                append-icon="search"
                label="Buscar"
                single-line
                hide-details
                v-model="search"
              )
        div(class="card-content" id="listaProductos")
          v-data-table(
            v-bind:headers="headers"
            :items="items"
            :rows-per-page-items= "rows"
            :search="search"
            class="elevation-1 text-md-right"
          )
            template(slot="items" scope="props")
              td(class="text-xs-center")
                v-edit-dialog(
                @open="tmp = props.item.cliente"
                @save="props.item.nombre = tmp || props.item.nombre"
                large
                lazy
                )
                  div {{ props.item.nombre }}
                  div(slot="input" class="mt-3 title") Actualizar Nombre
                  v-text-field(
                    slot="input"
                    label="Edit"
                    v-model="props.item.nombre"
                    single-line
                    counter
                    :rules="[max25Chars]"
                  )
              td(class="") {{ props.item.cantidad }}
              td(class="") {{ props.item.costoUnidad }}
              td(class="") {{ props.item.proveedor }}
              td(class="") {{ props.item.precioVenta }}
              td(class="") {{ props.item.fechaCompra }}
              td(class="") {{ props.item.tipoProducto }}
              td(class="text-xs-center px-2")
                v-btn(flat icon color="light-blue" class="ma-0"
                @click.stop="activarVentanaRemarcaje(props.item.id, props.item)")
                  v-icon() edit
                v-btn(flat icon color="light-blue" class="ma-0" 
                @click.stop="activarVentana(props.item.id, props.item)")
                  v-icon() add_shopping_cart
    //- Ventana Modal Modificar Inventario
    v-layout(row justify-center)
      v-dialog(v-model="dialog" persistent max-width="750px")
        v-btn(color="primary" dark slot="activator" id="openModal" style="display: none")
        v-card()
          v-card-title
            span(class="headline teal--text text-lighten-4" id="name") Modificar Inventario
          v-card-text
            v-container(grid-list-lg)
            v-form(
              v-model="valid"
              ref="formNewUnits"
              lazy-validation
            )
              v-layout(row wrap)
                v-layout(column)
                  v-flex(xs12)
                    h6(class="red--text text-xs-center") Estado Actual
                    v-flex(xs11)
                      v-text-field(
                        label="Costo por unidad"
                        type="number"
                        suffix="Bs"
                        disabled
                        v-model="currentState.costoUnidad"
                      )
                    v-flex(xs11)
                      v-text-field(
                        label="Cantidad"
                        type="number"
                        suffix="Bs"
                        disabled
                        v-model="currentState.cantidad"
                      )
                    v-flex(xs11)
                      v-text-field(
                        label="Precio de Venta"
                        v-model="currentState.precioVenta"
                        type="number"
                        suffix="Bs"
                        disabled
                      )
                v-layout(column)
                  v-flex(xs12)
                    h6(class="blue--text text-xs-center") Nuevo Estado
                    v-flex(xs12)
                      v-text-field(
                        label="Nuevo Costo por unidad"
                        class="input-group--focused"
                        :rules="[v => !!v || 'Item requiredo']"
                        required
                        type="number"
                        suffix="Bs"
                        v-model="newState.nuevoCostoUnidad"
                      )
                    v-flex(xs12)
                      v-text-field(
                        label="Nueva Cantidad"
                        type="number"
                        suffix="Bs"
                        v-model="newState.nuevaCantidad"
                      )
                    v-flex(xs12)
                      v-text-field(
                        label="Nuevo Precio de Venta"
                        type="number"
                        suffix="Bs"
                        v-model="newState.nuevoPrecioVenta"
                      )
              v-card-actions
                v-spacer
                v-btn(color="error" flat @click="closeModalNewUnits") Cerrar
                v-btn(color="blue darken-1" flat @click="submitNewUnits" :disabled= "!valid") Guardar
    v-layout(row justify-center)
      v-dialog(v-model="dialog2" persistent max-width="650px")
        v-btn(color="primary" dark slot="activator" id="openModalRemarcaje" style="display: none")
        v-card()
          v-card-title
            span(class="headline teal--text text-lighten-4" id="nombre") Modificar Inventario
          v-card-text
            v-container(grid-list-lg)
            v-form(
                  v-model="valid"
                  ref="formPrecioVenta"
                  lazy-validation
                )
              v-layout(row)
                v-layout(column align-center)
                  h6(class="red--text") Estado Actual
                  v-flex(xs12)
                    v-text-field(
                      label="Precio de Venta"
                      type="number"
                      suffix="Bs"
                      disabled
                      v-model="currentState.precioVenta"
                    )
                v-layout(column align-center)
                  h6(class="blue--text") Nuevo Estado
                  v-flex(xs12)
                    v-text-field(
                      label="Nuevo Precio de Venta"
                      required
                      type="number"
                      suffix="Bs"
                      v-model="newState.nuevoPrecioVenta"
                    )
              v-card-actions
                v-spacer
                v-btn(color="error" flat @click.native="dialog2 = false") Cerrar
                v-btn(color="blue darken-1" :disabled="!valid" flat @click="submitPrecioVenta") Guardar
    pre {{ items }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      products: {},
      valid: true,
      dialog: false,
      dialog2: false,
      rows: [10, 15, 25],
      tmp: '',
      max25Chars: (v) => v.length <= 25 || 'El nombre es muy largo!',
      currentState: {
        id: '',
        costoUnidad: '',
        cantidad: '',
        precioVenta: ''
      },
      newState: {
        nuevoCostoUnidad: '',
        nuevaCantidad: '',
        nuevoPrecioVenta: ''
      },
      search: '',
      headers: [{
        text: 'Nombre',
        align: 'center',
        sortable: true,
        value: 'nombre'
      },
      { text: 'Cantidad', value: 'cantidad' },
      { text: 'Costo por Unidad', value: 'costoUnidad' },
      { text: 'Proveedor', value: 'proveedor' },
      { text: 'Precio Venta', value: 'precioVenta' },
      { text: 'Fecha de Compra', value: 'fechaCompra' },
      { text: 'Tipo de Producto', value: 'tipoProducto' },
      { text: '', value: '' }]
    }
  },
  methods: {
    activarVentana (id, objProduct) {
      var edit = document.getElementById('openModal')
      let name = document.getElementById('name')

      name.innerHTML = `Modificar inventario de ${objProduct.nombre}`
      edit.click()
      this.fillCurrentStateForm(id, objProduct)
    },
    activarVentanaRemarcaje (id, objProduct) {
      let edit = document.getElementById('openModalRemarcaje')
      let nombre = document.getElementById('nombre')

      nombre.innerHTML = `Remarcar precio de venta de ${objProduct.nombre}`
      edit.click()
      this.fillCurrentStateForm(id, objProduct)
    },
    fillCurrentStateForm (id, objProduct) {
      this.currentState.costoUnidad = objProduct.costoUnidad
      this.currentState.cantidad = objProduct.cantidad
      this.currentState.precioVenta = objProduct.precioVenta
      this.currentState.id = objProduct.id
    },
    submitNewUnits () {
      if (this.$refs.form.validate()) {
        this.dispatchAddNewUnits(this.newState, this.currentState)
        this.clearNewUnits()
      }
    },
    submitPrecioVenta () {
      if (this.$refs.formPrecioVenta.validate()) {
        this.newPrice(this.currentState, this.newState)
        this.clearPrecioVenta()
      }
    },
    dispatchAddNewUnits (newState, currentState) {
      let newUnits = {
        costoUnidad: newState.nuevoCostoUnidad,
        precioVenta: newState.nuevoPrecioVenta,
        cantidad: newState.nuevaCantidad,
        cantidadActual: currentState.cantidad,
        id: currentState.id
      }
      this.$store.dispatch('products/addNewUnits', newUnits)
      this.dialog = false
    },
    newPrice (currentState, newState) {
      let newPrice = {
        precioVenta: currentState.precioVenta,
        nuevoPrecioVenta: newState.nuevoPrecioVenta,
        id: currentState.id
      }
      this.$store.dispatch('products/newPrice', newPrice)
      this.dialog2 = false
    },
    clearNewUnits () {
      this.$refs.formNewUnits.reset()
    },
    clearPrecioVenta () {
      this.$refs.formPrecioVenta.reset()
    },
    closeModalNewUnits () {
      this.dialog = false
      this.clearNewUnits()
    }
  },
  computed: {
    ...mapGetters({
      items: 'products/showAllProducts'
    })
  },
  created () {
    this.$store.dispatch('products/getAllProducts')
  }
}
</script>

<style>

</style>
