<template lang="pug">
  div
    //- upnav
    sidenav
    //- router-view
</template>

<script>
import sidenav from '@/components/Layout/sideNav.vue'
// import breadCrumbs from '@/components/Layout/breadCrumbs.vue'
// import upnav from '@/components/Layout/upNav.vue'
export default {
  components: { sidenav },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus">
  
</style>
