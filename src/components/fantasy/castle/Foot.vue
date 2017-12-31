<template>
  <div class="foot">
    <div class="proportion">
      <h2 class="chart-title">底部模块一</h2>
      <ul class="chart-legend">
        <li data-op="value">件</li>
        <li data-op="proportion">占比</li>
      </ul>
      <div class="proportion-chart" id="proportionChart">
        <svg>
          <defs>
            <linearGradient id="fillBarProportion" x1="0%" x2="0%" y1="100%" y2="0%">
              <stop offset="0%" stop-color="rgb(26,121,117)" stop-opacity="1" />
              <stop offset="100%" stop-color="rgb(156,231,234)" stop-opacity="1" />
            </linearGradient>
            <linearGradient id="fillBarProportionUp" x1="0%" x2="0%" y1="100%" y2="0%">
              <stop offset="0%" stop-color="rgb(156,231,234)" stop-opacity="1" />
              <stop offset="100%" stop-color="rgb(26,121,117)" stop-opacity="1" />
            </linearGradient>
            <linearGradient id="fillAreaProportion" x1="0%" x2="0%" y1="100%" y2="0%">
              <stop offset="0%" stop-color="rgb(18,0,255)" stop-opacity="0.10196" />
              <stop offset="100%" stop-color="rgb(196,106,254)" stop-opacity="1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
    <div class="tongbi chart-wrap">
      <h2 class="chart-title">底部模块二</h2>
      <ul class="chart-legend">
        <li data-op="tb">同比</li>
        <li data-op="value">当前</li>
        <li data-op="hb">环比</li>
      </ul>
      <div class="tongbi-chart" id="tongbiChart">
        <svg>
          <defs>
            <linearGradient id="jjValue" x1="0%" x2="0%" y1="100%" y2="0%">
              <stop offset="0%" stop-color="rgb(34,116,63)" stop-opacity="1" />
              <stop offset="100%" stop-color="rgb(147,255,68)" stop-opacity="1" />
            </linearGradient>
            <linearGradient id="jjValueUp" x1="0%" x2="0%" y1="100%" y2="0%">
              <stop offset="0%" stop-color="rgb(147,255,68)" stop-opacity="1" />
              <stop offset="100%" stop-color="rgb(34,116,63)" stop-opacity="1" />
            </linearGradient>
            <linearGradient id="jjTongbi" x1="0%" x2="0%" y1="100%" y2="0%">
              <stop offset="0%" stop-color="rgb(26,121,117)" stop-opacity="1" />
              <stop offset="100%" stop-color="rgb(156,231,234)" stop-opacity="1" />
            </linearGradient>
            <linearGradient id="jjTongbiUp" x1="0%" x2="0%" y1="100%" y2="0%">
              <stop offset="0%" stop-color="rgb(156,231,234)" stop-opacity="1" />
              <stop offset="100%" stop-color="rgb(26,121,117)" stop-opacity="1" />
            </linearGradient>
            <linearGradient id="jjHuanbi" x1="0%" x2="0%" y1="100%" y2="0%">
              <stop offset="0%" stop-color="rgb(38,93,135)" stop-opacity="1" />
              <stop offset="100%" stop-color="rgb(114,131,255)" stop-opacity="1" />
            </linearGradient>
            <linearGradient id="jjHuanbiUp" x1="0%" x2="0%" y1="100%" y2="0%">
              <stop offset="0%" stop-color="rgb(114,131,255)" stop-opacity="1" />
              <stop offset="100%" stop-color="rgb(38,93,135)" stop-opacity="1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import api from '../../../assets/scripts/tool/api'
  import Data from '../../../data/fantasy/castle/foot'
  import MixBarArea from '../../../assets/scripts/charts/mixBarArea'
  import DoubleBar from '../../../assets/scripts/charts/doubleBar'
  Data()
  export default {
    name: 'foot',
    data () {
      return {
      }
    },
    mounted () {
      const self = this
      axios.get(api.iottrend)
        .then(response => {
          const data = response.data.result
          self.dealProportion(data.proportion)
          self.dealTb(data.tongbi)
        })
        .catch(error => {
          console.error(error)
        })
    },
    methods: {
      dealProportion (data) {
        const config = {}
        const mixBarArea = new MixBarArea('.proportion-chart', config)
        mixBarArea.drawChart(data)
      },
      dealTb (data) {
        const config = {
          width: 1320,
          height: 330,
          padding: {
            top: 30,
            right: 30,
            bottom: 50,
            left: 30
          }
        }
        const doubleBar = new DoubleBar('#tongbiChart', config)
        doubleBar.drawChart(data)
      }
    }
  }
</script>
<style scoped>
  .proportion {
    position: absolute;
    top: 1480px;
    left: 80px;
    width: 1320px;
    height: 410px;
    background: url(../../../assets/images/fantasy/castle/foot-title-bg.png) no-repeat top left;
  }

  .proportion .chart-title,
  .tongbi .chart-title {
    top: 2px;
  }

  .tongbi {
    position: absolute;
    top: 1480px;
    right: 70px;
    width: 1320px;
    height: 410px;
    background: url(../../../assets/images/fantasy/castle/foot-title-bg.png) no-repeat top left;
    z-index: 0;
  }

  .chart-legend {
    position: absolute;
    top: 0px;
    right: 80px;
    width: 430px;
    height: 100px;
  }

  .proportion .chart-legend {
    left: 960px;
  }

  .chart-legend li {
    color: #fff;
    font-size: 32px;
    display: inline-block;
    height: 70px;
    width: 140px;
    text-align: right;
    cursor: pointer;
  }

  .proportion .chart-legend li:first-child {
    background: url(../../../assets/images/fantasy/castle/chart-legend-value.png) no-repeat 46px 14px;
  }

  .proportion .chart-legend li:last-child {
    background: url(../../../assets/images/fantasy/castle/chart-legend-com2.png) no-repeat 14px 14px;
  }

  .tongbi .chart-legend li:nth-child(1) {
    background: url(../../../assets/images/fantasy/castle/chart-legend-tb.png) no-repeat 14px 14px;
  }

  .tongbi .chart-legend li:nth-child(2) {
    background: url(../../../assets/images/fantasy/castle/chart-legend-now.png) no-repeat 14px 14px;
  }

  .tongbi .chart-legend li:nth-child(3) {
    background: url(../../../assets/images/fantasy/castle/chart-legend-hb.png) no-repeat 14px 14px;
  }

  .proportion-chart {
    position: absolute;
    top: 80px;
    left: 0;
    width: 1320px;
    height: 330px;
    background: url(../../../assets/images/common/mix-chart-grid.png) no-repeat 100px 1px;
    background-size: 87% 85%;
  }

  .tongbi-chart {
    position: absolute;
    top: 80px;
    left: 0;
    width: 1320px;
    height: 330px;
    background: url(../../../assets/images/common/mix-chart-grid.png) no-repeat 100px 1px;
    background-size: 87% 84%;
  }
</style>
