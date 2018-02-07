const state = {
  items: []
}

const getters = {
  allSalesForProducts: state => state.items
}

const actions = {
  getSaleForProduct ({ commit, rootState }, payload) {
    const formatNumber = (number) => number.toString().split('.').join('')
    const calculoTotalPagar = (precioVenta, item) => parseFloat(formatNumber(precioVenta)) * parseFloat(item)
    const numberWithDots = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

    const items = []
    // const collectionRef = rootState.db.collection('venta')
    const collectionRef = rootState.db.collection('venta')
    collectionRef.orderBy('articulos', 'asc').get().then(querySnapshot => {
      querySnapshot.forEach(docs => {
        const datos = docs.get('articulos')
        let consulta = datos.filter(dato => {
          return (dato.fechaVenta >= payload.desde && dato.fechaVenta <= payload.hasta)
        })
        consulta.map(dato => {
          items.push({
            idArticuloVendido: docs.id,
            articulo: dato.nombre,
            fechaVenta: dato.fechaVenta,
            cantidadSeleccionada: dato.items,
            precioVenta: dato.precioVenta,
            totalPagar: numberWithDots(calculoTotalPagar(dato.precioVenta, dato.items)),
            idArticuloIventario: dato.idArticulo,
            tipoPago: dato.tipoPago
          })
        })
      })
      commit('showSaleForProduct', items)
    })
      .catch(error => {
        throw new Error(error)
      })
  }
}

const mutations = {
  showSaleForProduct (state, payload) {
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
