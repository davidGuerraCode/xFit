import Vue from 'vue'
import Vuex from 'vuex'
import expenses from './modules/Expenses.js'
import sales from './modules/Sales.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    expenses,
    sales
  }
})
