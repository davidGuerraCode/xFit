const state = {
  items: []
}

const getters = {
  showAllProducts: state => state.items
}

const actions = {
  addProduct ({ rootState }, payload) {
    let product = {
      nombre: payload.nombre,
      cantidad: payload.cantidad,
      precioCompra: payload.precioCompra,
      costoUnidad: payload.costoUnidad,
      proveedor: payload.proveedor,
      precioVenta: payload.precioVenta,
      fechaCompra: payload.fechaCompra,
      tipoProducto: payload.tipoProducto,
      historicoPrecio: payload.historicoPrecio,
      descripcion: payload.descripcion,
      items: payload.items
    }
    let inventaryRef = rootState.db.collection('inventario')
    inventaryRef.add({ product })
  },
  addNewUnits ({ rootState }, payload) {
    let totalUnits = parseFloat(payload.cantidadActual) + parseFloat(payload.cantidad)
    // console.log(totalUnits)
    const collecctionRef = rootState.db.collection('inventario')
    collecctionRef.doc(payload.id).update({
      'product.cantidad': totalUnits,
      'product.precioVenta': payload.precioVenta,
      'product.costoUnidad': payload.costoUnidad
    })
    // firebase.database().ref('activo/inventario').child(payload.id).update({ cantidad: totalUnits, precioReferencia: payload.precioVenta, costoUnidad: payload.costoUnidad })
  },
  newPrice ({ rootState }, payload) {
    const collecctionRef = rootState.db.collection('inventario')
    collecctionRef.doc(payload.id).update({ 'product.precioVenta': payload.nuevoPrecioVenta })
    // firebase.database().ref('activo/inventario').child(payload.id).update({ precioReferencia: payload.nuevoPrecioVenta })
  },
  getAllProducts ({ commit, rootState }) {
    const items = []
    let collecctionRef = rootState.db.collection('inventario')
    collecctionRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const datos = doc.data()
        items.push({
          id: doc.id,
          cantidad: datos.product.cantidad,
          costoUnidad: datos.product.costoUnidad,
          descripcion: datos.product.descripcion,
          fechaCompra: datos.product.fechaCompra,
          historicoPrecio: datos.product.historicoPrecio,
          items: datos.product.items,
          nombre: datos.product.nombre,
          precioCompra: datos.product.precioCompra,
          precioVenta: datos.product.precioVenta,
          proveedor: datos.product.proveedor,
          tipoProducto: datos.product.tipoProducto
        })
      })
      commit('pushProducts', items)
    })
  }
}

const mutations = {
  pushProducts (state, payload) {
    state.items = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
