<template>
  <div class="sailor">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Sailor',
  data () {
    return {
      msg: '惊叹号---水手怕水'
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
