<template>
  <div class="castle">
    <TopSide :title="title"></TopSide>
    <TopMid></TopMid>
    <Left></Left>
    <Right></Right>
  </div>
</template>

<script>
import TopSide from '../../common/TopSide'
import TopMid from '../../common/TopMid'
import Left from './Left'
import Right from './Right'

  export default {
    name: 'Castle',
    data() {
      return {
        title: '威廉古堡'
      }
    },
    components:{
      TopSide,
      TopMid,
      Left,
      Right
    },
    mounted() {
      // axios.get(api.castleTop)
      // .then(function(response) {
      //   // console.log(response)
      // })
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
