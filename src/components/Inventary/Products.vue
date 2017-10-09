<template lang="pug">
  v-container(fluid)
    v-layout
      v-card
        v-card-title(primary-title)
          h3(class="teal--text text--accent-4") Productos
        div(class="card-content" id="listaProductos")
            v-data-table(
                v-bind:headers="headers"
                :items="items"
                hide-actions
                class="elevation-1 text-md-center")
                template(slot="items" scope="props")
                    td {{props.item.nombre}}
                    td(class="") {{props.item.cantidad}}
                    td(class="") {{props.item.costoUnidad}}
                    td(class="") {{props.item.proveedor}}
                    td(class="") {{props.item.precioReferencia}}
                    td(class="") {{props.item.fechaCompra}}
                    td(class="") {{props.item.tipoProducto}}
                    td(class="") {{props.item.descripcion}}
</template>

<script>
// import {conexref} from '@/assets/firebase'
import {productsRef} from '@/assets/dbAtreusFit.js'

export default {
  mounted () {
    console.log(productsRef)
  },
  data () {
    return {
      products: {},
      headers: [{
        text: 'Nombre',
        align: 'center',
        sortable: false,
        value: 'nombre'
      },
      { text: 'Cantidad', value: 'cantidad' },
      { text: 'Costo por Unidad', value: 'costoUnidad' },
      { text: 'Proveedor', value: 'proveedor' },
      { text: 'Precio Referencia', value: 'precioReferencia' },
      { text: 'Fecha de Compra', value: 'fechaCompra' },
      { text: 'Tipo de Producto', value: 'tipoProducto' },
      { text: 'Descripcion', value: 'descripcion' }]
    }
  },
  firebase: {
    items: {
      source: productsRef,
      cancelCallback (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style>
	
</style>
