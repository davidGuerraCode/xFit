import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import store from './Store'
import moment from 'moment'

import numbersPlugin from '@/plugins/numbersPlugin.js'
// import Chart from '@/components/Charts/statisticsChart.js'

Vue.use(numbersPlugin)
Vue.use(moment)
Vue.use(Vuetify)
Vue.config.productionTip = false

// Vue.component('chart-statistic', Chart)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
  /* created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAlGu2jVsYdilTTFI8o9TYs6oDGwiesYVI',
      authDomain: 'atreusfit.firebaseapp.com',
      databaseURL: 'https://atreusfit.firebaseio.com',
      projectId: 'atreusfit',
      storageBucket: 'atreusfit.appspot.com',
      messagingSenderId: '310643520107'
    })
  } */
})
