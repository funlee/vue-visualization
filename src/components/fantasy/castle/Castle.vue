<template>
  <div class="castle">
    <TopSide :title="title"></TopSide>
    <TopMid></TopMid>
    <Left></Left>
    <Right></Right>
    <MapHeat></MapHeat>
    <Foot></Foot>
  </div>
</template>
<script>
import TopSide from '../../common/TopSide'
import TopMid from '../../common/TopMid'
import Left from './Left'
import Right from './Right'
import Foot from './Foot'
import MapHeat from './MapHeat'
export default {
  name: 'Castle',
  data () {
    return {
      title: '测试页面'
    }
  },
  components: {
    TopSide,
    TopMid,
    Left,
    Right,
    Foot,
    MapHeat
  }
}
</script>
<style scoped>
</style>
