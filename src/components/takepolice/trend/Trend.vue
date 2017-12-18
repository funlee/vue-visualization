<template>
  <div class="trend">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'trend',
  data () {
    return {
      msg: 'this is takepolice -- trend -- component'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
 color: pink;
}
</style>
