<template>
  <div class="heat-map">
    <div class="map-chart" id="mapChart">
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import DrawMap from '../../../assets/scripts/charts/map'
  import api from '../../../assets/scripts/tool/api'
  import Data from '../../../data/fantasy/castle/doteMap'
  Data()
  export default {
    name: 'heatMap',
    data () {
      return {
      }
    },
    mounted () {
      axios.get(api.dotemap)
        .then(response => {
          const data = response.data.result.map
          this.render(data)
        })
        .catch(error => {
          console.error(error)
        })
    },
    methods: {
      render (data) {
        const config = {
          width: 1800,
          height: 1400
        }
        const drawMap = new DrawMap('#mapChart', config)
        drawMap.drawCharts(data)
      }
    }
  }
</script>
<style>
.area-heat-map{
  margin: 210px auto 0;
  border:1px solid red;
  padding: relative;
}
.map-chart{
  width:1800px;
  height:1400px;
  margin: 0 auto;
  transform: translateX(-100px);
  overflow: hidden;
}
.map-chart svg{
  display: block;
  margin: 80px auto 0;
}
</style>

