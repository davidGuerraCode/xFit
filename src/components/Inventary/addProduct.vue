<template lang="pug">
v-content
  v-container(fluid)
    v-layout(row-sm column-xs wrap)
      v-flex(xs12)
        v-card()
          v-container(fluid grid-list-lg)
            v-card-title(primary-title)
              div(class="light-blue--text headline") Nuevo Producto
            v-layout(row-sm column-xs wrap)
              v-flex(xs12)
                v-form(
                  v-model="valid"
                  ref="form"
                  lazy-validation
                )
                  v-layout(row-sm column-xs justify-space-between wrap)
                    v-flex(md4 sm4 xs10)
                      v-text-field(
                        label="Nombre del Producto"
                        class="input-group"
                        prepend-icon="create"
                        max="50"
                        counter
                        v-model="Inventario.nombre"
                        :rules="[(v) => !!v || 'Este campo no puede estar vacío']"
                        required
                      )
                    v-flex(md4 sm3 xs10)
                      v-text-field(
                        label="Precio de Compra"
                        class="input-group"
                        prepend-icon="attach_money"
                        suffix="Bs"
                        v-model.lazy="Inventario.precioCompra"
                        v-money="money"
                        
                      )
                    v-flex(md3 sm3 xs10)
                      v-text-field(
                        label="Cantidad"
                        class="input-group"
                        prepend-icon="format_list_numbered"
                        type="number"
                        suffix="Uds"
                        v-model="Inventario.cantidad"
                      )
                  v-layout(row-sm column-xs justify-space-between wrap)
                    v-flex(md4 sm4 xs10)
                      v-text-field(
                        label="Costo por Unidad"
                        class="input-group"
                        prepend-icon="attach_money"
                        hint="Valor individual de cada producto"
                        suffix="Bs"
                        @click.native.stop="calculo(Inventario.precioCompra, Inventario.cantidad)"
                        v-model.lazy="Inventario.costoUnidad"
                      )
                    v-flex(md4 sm3 xs10)
                      v-text-field(
                        label="Proveedor"
                        class="input-group"
                        prepend-icon="face"
                        v-model="Inventario.proveedor"
                      )
                    v-flex(md3 sm3 xs10)
                      v-menu(
                        lazy
                        :close-on-content-click="false"
                        ref="menu"
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
                          label="Fecha de Compra"
                          class="input-group"
                          v-model="Inventario.fechaCompra"
                          prepend-icon="event"
                          readonly
                        )
                        v-date-picker(
                          v-model="Inventario.fechaCompra"
                          no-title
                          @input="Inventario.fechaCompra = formatDate($event)"
                          autosave
                          scrollable
                          actions
                        )
                          v-spacer
                          v-btn(flat color="error" @click="menu = false") Cancel
                          v-btn(flat color="primary" @click="$refs.menu.save(date)") OK
                  v-layout(row-sm column-xs justify-space-between wrap)
                    v-flex(md4 sm4 xs10)
                      v-select(
                        label="Tipo Producto"
                        hide-details
                        v-model="Inventario.tipoProducto"
                        :items="tipos"
                        item-value="text"
                        auto
                        persistent-hint
                        prepend-icon="group_work"
                      )
                    v-flex(md4 sm3 xs10)
                      v-text-field(
                        label="Descripción"
                        class="input-group"
                        prepend-icon="short_text"
                        max="50"
                        counter
                        v-model="Inventario.descripcion"
                      )
                    v-flex(md3 sm3 xs10)
                      v-text-field(
                        label="Precio de Venta"
                        class="input-group"
                        prepend-icon="attach_money"
                        suffix="Bs"
                        v-model.lazy="Inventario.precioVenta"
                        v-money="money"
                      )
                  v-layout(row-sm column-xs wrap)
                    v-flex(md4 sm4 mr-5 xs10)
                      v-text-field(
                        label="Historico Precio Venta"
                        class="input-group"
                        prepend-icon="history"
                        suffix="Bs"
                        v-model.lazy="Inventario.historicoPrecio"
                        v-money="money"
                      )
                    v-flex(sm12 xs12 md4 xs10)
                      v-btn(
                        raised
                        type="file"
                        class="light-blue white--text mt-3"
                        @click="onLoandFile"
                      ) Cargar Factura
                      input(
                        type="file"
                        style="display: none"
                        ref="fileInput"
                      )
                  v-layout(row-sm column-xs justify-end)
                    v-flex(class="text-xs-center text-sm-right")
                      v-btn(class="light-blue white--text" @click="submit" :disabled= "!valid") Guardar
                      v-btn(class="red accent-4 white--text" @click="clear") Limpiar
                  v-snackbar(
                  :timeout="timeout"
                  :color="color"
                  top= true
                  right= true
                  v-model="snackbar"
                ) {{ text }}
      pre {{ Inventario }}
</template>

<script>
// import * as moment from 'moment'
import { VMoney } from 'v-money'

export default {
  data () {
    return {
      e1: null,
      e3: null,
      valid: true,
      date: null,
      menu: false,
      snackbar: false,
      color: 'teal accent-4',
      mode: '',
      timeout: 4000,
      text: `El producto fué agregado con exito al Inventario!`,
      items: [
        { text: 'categoria 1' }
      ],
      money: {
        precision: false,
        thousands: '.',
        masked: false
      },
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
        precioVenta: '',
        fechaCompra: null,
        tipoProducto: '',
        historicoPrecio: '',
        descripcion: ''
      }
    }
  },
  directives: { money: VMoney },
  methods: {
    allowedDates () {
      const date = new Date().toISOString()
      return date
    },
    calculo: function (precioCompra, cantidad) {
      if (precioCompra === '' && cantidad === '') {
        precioCompra = ''
        cantidad = ''
      } else {
        let split = precioCompra.split('.').join('')
        let costoUnidad = parseFloat(split) / parseFloat(cantidad)
        this.Inventario.costoUnidad = this.numberWithDots(costoUnidad.toFixed(2))
      }
    },
    numberWithDots (number) {
      console.log(number)
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    formatDate (date) {
      if (!date) {
        return null
      }

      const [year, month, day] = date.split('-')
      return `${day}-${month}-${year}`
    },
    addProduct () {
      let product = {
        nombre: this.Inventario.nombre,
        cantidad: this.Inventario.cantidad,
        precioCompra: this.Inventario.precioCompra,
        costoUnidad: this.Inventario.costoUnidad,
        proveedor: this.Inventario.proveedor,
        precioVenta: this.Inventario.precioVenta,
        fechaCompra: this.Inventario.fechaCompra,
        tipoProducto: this.Inventario.tipoProducto,
        historicoPrecio: this.Inventario.historicoPrecio,
        descripcion: this.Inventario.descripcion,
        items: 0
      }
      this.$store.dispatch('products/addProduct', product)
      this.$store.dispatch('getLastProduct')
      // this.$store.dispatch('registryPassiveNode')
      this.clear()
      this.snackbar = true
    },
    onLoandFile () {
      this.$refs.fileInput.click()
    },
    submit () {
      if (this.$refs.form.validate()) {
        this.addProduct()
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style>
</style>
