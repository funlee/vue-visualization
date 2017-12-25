<template>
  <div class="fireworks">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Fireworks',
  data () {
    return {
      msg: '跨时代---烟花易冷'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  color:red
}

</style>
