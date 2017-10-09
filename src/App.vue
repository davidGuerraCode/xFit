<template lang="pug">
div
  router-view
</template>

<script>
import layout from '@/components/Layout/Master.vue'

export default {
  components: { layout },
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
