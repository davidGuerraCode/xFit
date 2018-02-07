const state = {
  items: []
}

const getters = {
  allInventary: state => state.items,
  saleId: state => state.saleId
}

const actions = {
  addArticlesSaled ({ commit, rootState }, payload) {
    console.log(payload)
    const collectionRef = rootState.db.collection('venta')
    collectionRef.add(payload)
  },
  getInventary ({ commit, rootState }) {
    const items = []
    let collectionRef = rootState.db.collection('inventario')
    collectionRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const datos = doc.data()
        items.push({
          idArticulo: doc.id,
          nombre: datos.product.nombre,
          cantidad: datos.product.cantidad,
          costoUnidad: datos.product.costoUnidad,
          precioVenta: datos.product.precioVenta,
          tipoProducto: datos.product.tipoProducto,
          items: datos.product.items
        })
      })
      commit('showInventary', items)
      // console.log(items)
    })
    .catch(error => {
      throw new Error(error)
    })
  },
  updateProduct ({ rootState }, payload) {
    let items
    payload.map((product) => {
      items = {
        cantidad: product.cantidad,
        key: product.idArticulo
      }
      const collectionRef = rootState.db.collection('inventario')
      collectionRef.doc(items.key).update({ 'product.cantidad': items.cantidad })
    })
  }
}

const mutations = {
  showInventary (state, payload) {
    state.items = payload
    // console.log(state.items)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
