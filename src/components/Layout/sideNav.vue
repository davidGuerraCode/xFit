<template lang="pug">
  v-app(height="415px" id="e3" standalone)
    v-navigation-drawer(persistent absolute height="100%" clipped enable-resize-watcher v-model="dibujar" :mini-variant.sync="mini" overflow class="blue-grey darken-3")
      v-list(dense class="pa-0 blue-grey darken-3")
        v-list-tile(avatar tag="div")
          v-list-tile-avatar
            img(src="https://randomuser.me/api/portraits/men/85.jpg")
          v-list-tile-content
            v-list-tile-title(class="white--text") David Vásquez
          v-list-tile-action
            v-btn(dark icon @click.native.stop="mini = !mini")
              v-icon chevron_left
        template(v-for="(item, i) in items")
          v-layout(row v-if="item.heading" align-center :key="i")
            v-flex(xs6)
              v-subheader(v-if="item.heading") {{item.heading}}
            v-flex(x6 class="text-xs-center")
              a(href="#!" class="body-2 black-text") EDIT
          v-list-group(v-else-if="item.children" v-model="item.model" no-action)
            v-list-tile(slot="item")
              v-list-tile-action()
                v-icon(class="teal--text text--accent-4") {{ item.icon2 }}
              v-list-tile-content
                v-list-tile-title(class="white--text") {{ item.text }}
              v-list-tile-action()
                v-icon(class="teal--text") {{ item.model ? item.icon : item['icon-alt'] }}
            v-list-tile(v-for="(child, i) in item.children" :key="i"  :to="child.link")
              v-list-tile-action(v-if="child.icon")
                v-icon {{ child.icon }}
              v-list-tile-content
                v-list-tile-title {{ child.text }}
          v-list-tile(v-else  :to="item.link")
            v-list-tile-action
              v-icon(class="teal--text text--accent-4") {{ item.icon }}
            v-list-tile-content
              v-list-tile-title(class="white--text hola") {{ item.text }}
    v-toolbar(class="blue-grey darken-3 white--text")
      v-toolbar-side-icon(class="white--text" v-on:click.native.stop="dibujar = !dibujar")
      v-toolbar-items
        v-btn(flat)
          img(src="static/img/AtreusLogo.png" class="logo")
      v-spacer
      v-toolbar-items
        v-btn(flat class="white--text")
          v-icon(center class="white--text") notifications
        v-btn(flat class="white--text")
          v-icon(center class="white--text") email
        v-btn(flat class="white--text")
          v-icon(center class="white--text") assignment
        v-btn(flat class="white--text")
          v-icon(center class="white--text") home
        v-btn(flat class="white--text hidden-xs-only") Logout
    main
      router-view
</template>

<script>
export default {
  data () {
    return {
      dibujar: true,
      mini: true,
      items: [
        { icon: 'list', text: 'Resumen' },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Inventario',
          icon2: 'assignment',
          model: false,
          children: [
          { icon: 'add_shopping_cart', text: 'Agregar Producto', link: '/addProduct' },
          { icon: 'shopping_cart', text: 'Mis Productos', link: '/Products' }
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Venta',
          icon2: 'attach_money',
          model: false,
          children: [
          { icon: 'shopping_cart', text: 'Producto', link: '/Sales' },
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
          { icon: 'subject', text: 'Consultar Gastos', link: '/Expenses' }
          ]
        },
        { icon: 'trending_up', text: 'Estadísticas', link: '/Statistics' },
        { icon: 'assignment_ind', text: 'Personal', link: '#' },
        { icon: 'settings', text: 'Configuración', link: '#' }
      ]
    }
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
