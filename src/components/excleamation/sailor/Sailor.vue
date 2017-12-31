<template>
  <div class="sailor">
    <TopSide :title="title"></TopSide>
  </div>
</template>

<script>
import TopSide from '../../common/TopSide'
export default {
  name: 'Sailor',
  data () {
    return {
      title: '开发中...'
    }
  },
  components: {
    TopSide
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  color:red
}

</style>
