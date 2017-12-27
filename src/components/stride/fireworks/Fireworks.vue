<template>
  <div class="fireworks">
    <TopSide :title="title"></TopSide>
  </div>
</template>

<script>
import TopSide from '../../common/TopSide'
export default {
  data () {
    return {
      title: '测试页面'
    }
  },
  components: {
    TopSide
  }
}
</script>
<style scoped>

</style>
