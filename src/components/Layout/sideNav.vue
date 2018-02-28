<template lang="pug">
div
  v-navigation-drawer(persistent app dark disable-route-watcher clipped enable-resize-watcher v-model="dibujar" :mini-variant.sync="mini" class="blue-grey darken-3")
    v-list(class="pa-0 blue-grey darken-3" dense)
      v-list-tile(avatar tag="div" class="mt-2 pb-2")
        v-list-tile-avatar
          img(src="https://randomuser.me/api/portraits/men/85.jpg")
        v-list-tile-content
          v-list-tile-title(class="white--text") David Vásquez
        v-list-tile-action
          v-btn(dark icon @click.native.stop="mini = !mini")
            v-icon(class="blue-grey--text text--lighten-4") chevron_left
      v-divider
      template(v-for="(item, i) in items")
        v-layout(row v-if="item.heading" align-center :key="i")
          v-flex(xs6)
            v-subheader(v-if="item.heading") {{item.heading}}
          v-flex(x6 class="text-xs-center")
            a(href="#!" class="body-2 black-text") EDIT
        v-list-group(
          v-else-if="item.children"
          v-model="item.model"
          active-class="teal--text text-accent-4"
          :prepend-icon="item.icon2"
        )
          v-list-tile(slot="activator")
            v-list-tile-content
              v-list-tile-title(class="blue-grey--text text--lighten-4") {{ item.text }}
          v-list-tile(v-for="(child, i) in item.children" :key="i"  :to="child.link")
            v-list-tile-action(v-if="child.icon")
              v-icon() {{ child.icon }}
            v-list-tile-content
              v-list-tile-title {{ child.text }}
        v-list-tile(v-else  :to="item.link")
          v-list-tile-action
            v-icon(class="") {{ item.icon }}
          v-list-tile-content
            v-list-tile-title(class="blue-grey--text text--lighten-4 hola") {{ item.text }}
  v-toolbar(class="blue-grey darken-3 white--text" clipped-left app dense fixed)
    v-toolbar-side-icon(class="white--text" v-on:click.stop="dibujar = !dibujar")
    v-toolbar-items
      v-btn(flat)
        img(src="static/img/AtreusLogo.png" class="logo")
    v-spacer
    v-toolbar-items
      p(class="white--text mt-3 subheading") {{ currentUser.email }}
      v-btn(flat class="white--text")
        v-icon(center class="white--text") notifications
      v-btn(flat class="white--text")
        v-icon(center class="white--text") email
      v-btn(flat class="white--text")
        v-icon(center class="white--text") assignment
      v-btn(flat class="white--text hidden-xs-only" @click="onLogout") Logout
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      dibujar: true,
      mini: true,
      items: [
        { icon: 'list', text: 'resumen', link: '/' },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Inventario',
          icon2: 'store',
          model: false,
          children: [
          { icon: 'add_shopping_cart', text: 'Agregar Producto', link: '/addProduct' },
          { icon: 'shopping_cart', text: 'Mis Productos', link: '/products' }
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Venta',
          icon2: 'shopping_cart',
          model: false,
          children: [
          { icon: 'shopping_basket', text: 'Producto', link: '/sales' },
          { icon: 'subject', text: 'Servicio', link: '/' }
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Ingresos',
          icon2: 'attach_money',
          model: false,
          children: [
          { icon: 'shopping_basket', text: 'Producto', link: '/incomeProduct' },
          { icon: 'subject', text: 'Servicio', link: '/' }
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Gastos',
          icon2: 'credit_card',
          model: false,
          children: [
          { icon: 'shopping_cart', text: 'Cargar Gastos', link: '/addExpenses' },
          { icon: 'subject', text: 'Consultar Gastos', link: '/expenses' }
          ]
        },
        { icon: 'trending_up', text: 'Estadísticas', link: '/statistics' },
        { icon: 'assignment_ind', text: 'Personal', link: '#' },
        { icon: 'settings', text: 'Configuración', link: '#' }
      ]
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('user/logout')
        .then(() => {
          this.$router.push('/signin')
        })
      console.log('User Logout')
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser'
    })
  }
}
</script>

<style>
  .borde:hover {
    border-left: 5px solid blue;
  }
  .logo{
    position: relative;
    bottom: 3px;
    width: 80px;
  }
</style>
