import * as firebase from 'firebase'

const state = {
  items: []
}

const getters = {
  showAllProducts: state => state.items
}

const actions = {
  addProduct ({ commit }, payload) {
    let product = {
      nombre: payload.nombre,
      cantidad: payload.cantidad,
      precioCompra: payload.precioCompra,
      costoUnidad: payload.costoUnidad,
      proveedor: payload.proveedor,
      precioReferencia: payload.precioReferencia,
      fechaCompra: payload.fechaCompra,
      tipoProducto: payload.tipoProducto,
      historicoPrecio: payload.historicoPrecio,
      descripcion: payload.descripcion
    }
    firebase.database().ref('inventario').push(product)
  },
  getAllProducts ({ commit }) {
    firebase.database().ref('inventario').once('value').then(data => {
      const items = []
      const datos = data.val()
      for (let key in datos) {
        items.push({
          nombre: datos[key].nombre,
          cantidad: datos[key].cantidad,
          precioCompra: datos[key].precioCompra,
          costoUnidad: datos[key].costoUnidad,
          proveedor: datos[key].proveedor,
          precioReferencia: datos[key].precioReferencia,
          fechaCompra: datos[key].fechaCompra,
          tipoProducto: datos[key].tipoProducto,
          descripcion: datos[key].descripcion
        })
      }
      commit('pushPrducts', items)
    })
  }
}

const mutations = {
  pushPrducts (state, payload) {
    state.items = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
