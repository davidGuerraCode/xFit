import Vue from 'vue'
import Router from 'vue-router'
// import Layout from '@/components/Layout/Master.vue'
import Resumen from '@/components/Resumen/resumen.vue'
import addProduct from '@/components/Inventary/addProduct.vue'
import Products from '@/components/Inventary/Products.vue'
import addExpenses from '@/components/Expenses/addExpenses.vue'
import Expenses from '@/components/Expenses/Expenses.vue'
import Statistics from '@/components/Statistics/Statistics.vue'
import Sales from '@/components/Sales/Sale.vue'
import incomeProduct from '@/components/Income/incomeProduct.vue'
import Signin from '@/components/User/Signin.vue'
import Signup from '@/components/User/Signup.vue'

import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Resumen,
      name: 'resumen',
      beforeEnter: AuthGuard
    },
    {
      path: '/addProduct',
      component: addProduct,
      name: 'addProduct',
      beforeEnter: AuthGuard
    },
    {
      path: '/products',
      component: Products,
      name: 'products',
      beforeEnter: AuthGuard
    },
    {
      path: '/addExpenses',
      component: addExpenses,
      name: 'addExpenses',
      beforeEnter: AuthGuard
    },
    {
      path: '/expenses',
      component: Expenses,
      name: 'expenses',
      beforeEnter: AuthGuard
    },
    {
      path: '/statistics',
      component: Statistics,
      name: 'statistics',
      beforeEnter: AuthGuard
    },
    {
      path: '/sales',
      component: Sales,
      name: 'sales',
      beforeEnter: AuthGuard
    },
    {
      path: '/incomeProduct',
      component: incomeProduct,
      name: 'incomeProduct',
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
  ]
})
