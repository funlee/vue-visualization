<template>
  <div class="castle">
    <TopSide :title="title"></TopSide>
    <TopMid></TopMid>
  </div>
</template>

<script>
import TopSide from '../../common/TopSide'
import TopMid from '../../common/TopMid'

  export default {
    name: 'Castle',
    data() {
      return {
        title: '威廉古堡'
      }
    },
    components:{
      TopSide,
      TopMid
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
