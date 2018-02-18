import Vue from 'vue'
import Vuex from 'vuex'
import firebaseInit from '@/firebase-init'

import expenses from './modules/Expenses.js'
import sales from './modules/Sales.js'
import products from './modules/Products.js'
import resumen from './modules/Resumen.js'
import passive from './modules/Passive.js'
import incomes from './modules/Income.js'
import statistics from './modules/statistics'
import user from './modules/User'

Vue.use(Vuex)

const state = {
  db: firebaseInit,
  auth: firebaseInit.app.firebase_.auth()
}

export default new Vuex.Store({
  state,
  modules: {
    expenses,
    sales,
    products,
    resumen,
    passive,
    incomes,
    statistics,
    user
  }
})
