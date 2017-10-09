<template lang="pug">
v-container(fluid)
  v-layout
    v-flex(xs12) 
      v-card()
        v-card-text
          v-layout(row-sm column-xs)
            v-flex(xs12 class="text-xs-center text-md-left")
              h3(class="teal--text text--accent-4") Nuevo Producto
          v-layout()
            v-flex(xs12)
              form(@submit.prevent="newProduct()")
                v-layout(row-sm column-xs justify-space-between)
                  v-flex(md4 sm4)
                    v-text-field(
                      label="Nombre"
                      class="input-group"
                      prepend-icon="create"
                      max="50"
                      counter
                      v-model="Inventario.nombre"
                    )
                  v-flex(md4 sm3)
                    v-text-field(
                      label="Precio de Compra"
                      class="input-group"
                      prepend-icon="attach_money"
                      suffix="Bs"
                      type="number"
                      v-model="Inventario.precioCompra"
                    )
                  v-flex(md3 sm3)
                    v-text-field(
                      label="Cantidad"
                      class="input-group"
                      prepend-icon="format_list_numbered"
                      type="number"
                      suffix="Uds"
                      v-model="Inventario.cantidad"
                    )
                v-layout(row-sm column-xs justify-space-between)
                  v-flex(md4 sm4)
                    v-text-field(
                      label="Costo por Unidad"
                      class="input-group"
                      prepend-icon="attach_money" 
                      v-model="Inventario.costoUnidad"
                      hint="Valor individual de cada producto"
                      suffix="Bs"
                      @click.native.stop="calculo()"
                    )
                  v-flex(md4 sm3)
                    v-text-field(
                      label="Proveedor"
                      class="input-group"
                      prepend-icon="face"
                      v-model="Inventario.proveedor"
                    )
                  v-flex(md3 sm3)
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
                        label="Fecha de Compra"
                        class="input-group"
                        v-model="Inventario.fechaCompra"
                        prepend-icon="event" 
                        readonly
                      )
                      v-date-picker(
                        v-model="Inventario.fechaCompra" 
                        no-title 
                        scrollable actions
                        autosave)
                        template(scope="{ save, cancel }")
                          v-card-actions
                            v-btn(flat primary @click.native="cancel()") Cancelar
                            v-btn(flat primary @click.native="save()") Guardar
                v-layout(row-sm column-xs justify-space-between)
                  v-flex(md4 sm4)
                    v-select(
                      label="Tipo Producto"
                      hide-details
                      v-model="Inventario.tipoProducto"
                      v-bind:items="tipos"
                      item-value="text"
                      auto
                      persistent-hint
                      prepend-icon="group_work"
                    )
                  v-flex(md4 sm3)
                    v-text-field(
                      label="Descripción"
                      class="input-group"
                      prepend-icon="short_text"
                      max="50"
                      counter
                      v-model="Inventario.descripcion" 
                    )
                  v-flex(md3 sm3)
                    v-text-field(
                      label="Precio de Referencia"
                      class="input-group"
                      prepend-icon="attach_money"
                      type="number"
                      suffix="Bs"
                      v-model="Inventario.precioReferencia"
                    )
                v-layout(row-sm column-xs)
                  v-flex(md4 sm4 mr-5)
                    v-text-field(
                      label="Historico Precio Venta"
                      class="input-group"
                      prepend-icon="history"
                      type="number"
                      suffix="Bs"
                      v-model="Inventario.historicoPrecio"
                    )
                  v-flex(sm12 xs12 md4)
                    p()
                      v-icon="backup" 
                      |Cargar Factura
                    v-text-field(
                      type="file"
                      class="input-group"
                    )
                v-layout(row-sm column-xs justify-end)
                  v-flex(class="text-xs-center text-sm-right")
                    v-btn(class="teal accent-4 white--text" type="submit") Guardar  
  pre {{Inventario}}
</template>

<script>
  import {productsRef} from '@/assets/dbAtreusFit.js'
/*  import firebase from 'firebase'

let config = {
   apiKey: 'AIzaSyAlGu2jVsYdilTTFI8o9TYs6oDGwiesYVI',
   authDomain: 'atreusfit.firebaseapp.com',
   databaseURL: 'https://atreusfit.firebaseio.com',
   projectId: 'atreusfit',
   storageBucket: 'atreusfit.appspot.com',
   messagingSenderId: '310643520107'
}
let app = firebase.initializeApp(config)
let db = app.database()
let productsRef = db.ref('inventario') */

export default {
    data () {
      return {
        e1: null,
        e3: null,
        menu: false,
        items: [
          { text: 'categoria 1' }
        ],
        select: null,
        tipos: [
          {text: 'Suplementos'},
          {text: 'Vestimenta'},
          {text: 'Equipos Deportivos'},
          {text: 'Cafetín'}
        ],
        Inventario: {
          nombre: '',
          cantidad: '',
          precioCompra: '',
          costoUnidad: '',
          proveedor: '',
          precioReferencia: '',
          fechaCompra: '',
          tipoProducto: '',
          historicoPrecio: '',
          descripcion: ''
        }
      }
    },
    methods: {
      newProduct: function () {
        productsRef.push(this.Inventario)
      },
      calculo: function () {
        if (!this.Inventario.precioCompra && !this.Inventario.cantidad) {
          this.Inventario.precioCompra = ''
          this.Inventario.cantidad = ''
        } else {
          let costoUnidad = this.Inventario.precioCompra / this.Inventario.cantidad
          this.Inventario.costoUnidad = costoUnidad
        }
      }
    }
  }
</script>

<style>
</style>
