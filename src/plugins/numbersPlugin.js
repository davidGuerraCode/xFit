/* import Notifications from './Notifications.vue'

const NotificationStore = {
  state: [], // here the notifications will be added

  removeNotification (index) {
    this.state.splice(index, 1)
  },
  notify (notification) {
    this.state.push(notification)
  }
}

var NotificationsPlugin = {

  install (Vue) {
    Object.defineProperty(Vue.prototype, '$notifications', {
      get () {
        return NotificationStore
      }
    })
    Vue.component('Notifications', Notifications)
  }
}

export default NotificationsPlugin */

const moneyPlugin = {
  install (Vue, options) {
    Vue.prototype.$numbers = {
      numberWithDots: (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
      formatNumber: (number = '') => parseFloat(number.toString().split('.').join('')),
      totalSalePrice: function (salePrice, item) {
        let price = this.formatNumber(salePrice)
        let items = this.formatNumber(item)

        return price * items
      },
      addArrayOfNumbers: function (numbersArray) {
        const self = this
        let reducer = (acc, currentNumber) => acc + currentNumber
        const total = numbersArray.map(item => self.formatNumber(item)).reduce(reducer, 0)

        return self.numberWithDots(total)
      }
    }
  }
}

export default moneyPlugin
