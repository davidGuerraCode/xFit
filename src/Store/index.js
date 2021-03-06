import Vue from 'vue'
import Vuex from 'vuex'
import expenses from './modules/Expenses.js'
import sales from './modules/Sales.js'
import products from './modules/Products.js'
import resumen from './modules/Resumen.js'
import passive from './modules/Passive.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    expenses,
    sales,
    products,
    resumen,
    passive
  }
})
