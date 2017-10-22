<template lang="pug">
v-content
  v-container(fluid)
    v-layout(justify-center)
      v-card
        v-card-title(primary-title)
          div
            h3(class="teal--text text--accent-4") Productos
        div(class="card-content" id="listaProductos")
            v-data-table(
              v-bind:headers="headers"
              :items="items"
              expand
              hide-actions
              class="elevation-1 text-md-right"
            )
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
export default {
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
  computed: {
    items () {
      return this.$store.getters.showAllProducts
    }
  },
  created () {
    this.$store.dispatch('getAllProducts')
  }
}
</script>

<style>

</style>
