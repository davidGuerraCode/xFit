<template lang="pug">
v-app
  layout(v-if="userIsAuthenticated")
  main
    router-view
</template>

<script>
import layout from '@/components/Layout/Master.vue'
// import user from './Store/modules/User'
import { mapGetters } from 'vuex'

export default {
  components: { layout },
  data () {
    return {
    }
  },
  created () {
    console.log(this.$store.state.db)
  },
  computed: {
    ...mapGetters({
      user: 'user/currentUser'
    }),
    userIsAuthenticated () {
      return this.user !== null && this.user !== undefined
    }
  }
}
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
