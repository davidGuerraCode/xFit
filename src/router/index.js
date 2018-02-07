import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout/Master.vue'
import Resumen from '@/components/Resumen/resumen.vue'
import addProduct from '@/components/Inventary/addProduct.vue'
import Products from '@/components/Inventary/Products.vue'
import addExpenses from '@/components/Expenses/addExpenses.vue'
import Expenses from '@/components/Expenses/Expenses.vue'
import Statistics from '@/components/Statistics/Statistics.vue'
import Sales from '@/components/Sales/Sale.vue'
import incomeProduct from '@/components/Income/incomeProduct.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Resumen',
      name: 'Layout',
      component: Layout,
      children: [
        { path: '/Resumen', component: Resumen },
        { path: '/addProduct', component: addProduct },
        { path: '/Products', component: Products },
        { path: '/addExpenses', component: addExpenses },
        { path: '/Expenses', component: Expenses },
        { path: '/Statistics', component: Statistics },
        { path: '/Sales', component: Sales },
        { path: '/incomeProduct', component: incomeProduct }
      ]
    }
  ]
})
