<template lang="pug">
    v-toolbar(class="blue-grey darken-3 white--text")
      v-toolbar-side-icon(class="white--text" v-on:click.native="cambiar()")
      v-toolbar-items
        v-btn(flat)
          img(src="static/img/AtreusLogo.png" class="logo")
      v-spacer
      v-toolbar-items
        v-btn(flat class="white--text")
          v-icon(left class="white--text") person
          | David Vásquez
        v-btn(flat class="white--text")
          v-icon(center class="white--text") notifications
        v-btn(flat class="white--text")
          v-icon(center class="white--text") email
        v-btn(flat class="white--text")
          v-icon(center class="white--text") assignment
        v-btn(flat class="white--text")
          v-icon(center class="white--text") home
        v-btn(flat class="white--text") Sign Out
      

</template>

<script>
import {bus} from '@/main'
export default {
  props: ['dibujar'],
  data () {
    return {
    }
  },
  methods: {
    cambiar: function () {
      bus.$emit('cambiar', !this.dibujar)
    }
  }
}
</script>

<style>
  .logo{
    position: relative;
    bottom: 3px;
    width: 80px;
  }
</style>
