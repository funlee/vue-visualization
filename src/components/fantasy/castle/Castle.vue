<template>
  <div class="castle">
    <TopSide :title="title"></TopSide>
    <TopMid></TopMid>
    <Left></Left>
    <Right></Right>
    <Foot></Foot>
  </div>
</template>
<script>
import TopSide from '../../common/TopSide'
import TopMid from '../../common/TopMid'
import Left from './Left'
import Right from './Right'
import Foot from './Foot'
export default {
  name: 'Castle',
  data () {
    return {
      title: '威廉古堡'
    }
  },
  components: {
    TopSide,
    TopMid,
    Left,
    Right,
    Foot
  },
  mounted () {
    console.log(123)
  }
}
</script>
<style scoped>
</style>
