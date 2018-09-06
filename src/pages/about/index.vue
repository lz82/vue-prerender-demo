<template>
  <div class="container">
    {{desc}}
  </div>
</template>

<script>
  export default {
    name: 'AboutPage',

    data () {
      return {
        desc: ''
      }
    },

    mounted () {
      this.desc = 'this is about page.'
    }
  }
</script>

<style scoped lang="less">

</style>
