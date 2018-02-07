const state = {
  items: []
}
const getters = {
  allSalesForProducts: state => state.items
}
const actions = {
  getSaleForProduct ({ commit, rootState }, payload) {
    return new Promise((resolve, reject) => {
      const formatNumber = (number) => number.toString().split('.').join('')
      const calculoTotalPagar = (precioVenta, item) => parseFloat(formatNumber(precioVenta)) * parseFloat(item)
      const items = []
      const collectionRef = rootState.db.collection('venta')
      collectionRef.orderBy('articulos', 'asc').get().then(querySnapshot => {
        querySnapshot.forEach(docs => {
          const datos = docs.get('articulos')
          let consulta = datos.filter(dato => {
            return (dato.fechaVenta >= payload.desde && dato.fechaVenta <= payload.hasta)
          })
          consulta.map(dato => {
            items.push({
              fechaVenta: dato.fechaVenta,
              totalPagar: calculoTotalPagar(dato.precioVenta, dato.items)
            })
          })
        })
        commit('showSaleForProduct', items)
        resolve()
      })
        .catch(error => {
          throw new Error(error)
        })
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
