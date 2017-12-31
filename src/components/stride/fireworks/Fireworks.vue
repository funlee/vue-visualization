<template>
  <div class="fireworks">
    <TopSide :title="title"></TopSide>
    <div class="select-wrap">
      <div class="drop-down">
        <div class="target-value" :class="{fold: seenDis}" @click="showFold">{{targetValue}}</div>
        <ul class="down-list" v-if="seenDis">
          <li v-for="item in districtData" :key="item.id" :data-key="item.key" :title="item.value" @click="getValue(item.key, item.value)">{{item.value}}</li>
        </ul>
      </div>
    </div>
    <div class="chart-wrap">
      <div class="chart">
        <svg>
          <defs>
            <linearGradient id="trValue" x1="0%" x2="0%" y1="100%" y2="0%">
              <stop offset="0%" stop-color="rgb(74,140,229)" stop-opacity="1" />
              <stop offset="100%" stop-color="rgb(0,255,255)" stop-opacity="1" />
            </linearGradient>
            <linearGradient id="trValueUp" x1="0%" x2="0%" y1="100%" y2="0%">
              <stop offset="0%" stop-color="rgb(0,255,255)" stop-opacity="1" />
              <stop offset="100%" stop-color="rgb(74,140,229)" stop-opacity="1" />
            </linearGradient>
            <linearGradient id="trTongbi" x1="0%" x2="0%" y1="100%" y2="0%">
              <stop offset="0%" stop-color="rgb(255,254,164)" stop-opacity="1" />
              <stop offset="100%" stop-color="rgb(68,255,134)" stop-opacity="1" />
            </linearGradient>
            <linearGradient id="trTongbiUp" x1="0%" x2="0%" y1="100%" y2="0%">
              <stop offset="0%" stop-color="rgb(68,255,134)" stop-opacity="1" />
              <stop offset="100%" stop-color="rgb(255,254,164)" stop-opacity="1" />
            </linearGradient>
            <linearGradient id="trHuanbi" x1="0%" x2="0%" y1="100%" y2="0%">
              <stop offset="0%" stop-color="rgb(254,255,153)" stop-opacity="1" />
              <stop offset="100%" stop-color="rgb(255,130,68)" stop-opacity="1" />
            </linearGradient>
            <linearGradient id="trHuanbiUp" x1="0%" x2="0%" y1="100%" y2="0%">
              <stop offset="0%" stop-color="rgb(255,130,68)" stop-opacity="1" />
              <stop offset="100%" stop-color="rgb(254,255,153)" stop-opacity="1" />
            </linearGradient>
            <mask class="mask" id="mask" maskUnits="userSpaceOnUse">
              <rect x="0" y="0" width="2700" height="1246" fill="white"></rect>
              <g class="mask-line">
                  <!--js创建-->
              </g>
            </mask>
          </defs>
        </svg>
      </div>
      <ul class="chart-legend">
        <li v-for="list in legend" :data-op="list.type" :key="list.key">{{list.value}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import TopSide from '../../common/TopSide'
import DropDown from '../../common/DropDown'
import DoubleBar from '../../../assets/scripts/charts/doubleBar'
import axios from 'axios'
import api from '../../../assets/scripts/tool/api'
import disData from '../../../data/stride/fireworks/district'
import listData from '../../../data/stride/fireworks/list'
disData()
listData()
export default {
  data () {
    return {
      title: '测试页面',
      districtData: [],
      districtKey: 1,
      targetValue: '',
      seenDis: false,
      legend: [
        {
          value: '同比',
          type: 'tb'
        },
        {
          value: '数值',
          type: 'value'
        },
        {
          value: '环比',
          type: 'hb'
        }
      ]
    }
  },
  components: {
    TopSide,
    DropDown
  },
  mounted () {
    axios.get(api.district)
      .then(response => {
        let data = response.data.result.city
        this.targetValue = data[0].value
        this.districtData = data.map(item => {
          return {
            ...item
          }
        })
      })
      .catch(error => console.error(error))
    this.getData()
  },
  methods: {
    showFold () {
      this.seenDis = !this.seenDis
    },
    getValue (key, value) {
      this.targetValue = value
      this.districtKey = key
      this.getData()
      this.seenDis = !this.seenDis
    },
    getData () {
      axios.get(`${api.list}/${this.districtKey}`)
      .then(response => {
        let data = response.data.result.list
        this.renderChart(data)
      })
      .catch(error => console.error(error))
    },
    renderChart (data) {
      const config = {
        width: 2700,
        height: 1246,
        ticks: 4,
        xAxisLine: false,
        yAxisLine: true,
        value: 'url(#trValue)',
        valueUp: 'url(#trValueUp)',
        tongbi: 'url(#trTongbi)',
        tongbiUp: 'url(#trTongbiUp)',
        huanbi: 'url(#trHuanbi)',
        huanbiUp: 'url(#trHuanbiUp)',
        padding: {
          top: 30,
          right: 40,
          bottom: 50,
          left: 50
        },
        mask: true
      }
      const doubleBar = new DoubleBar('.chart', config)
      doubleBar.drawChart(data)
    }
  }
}
</script>
<style scoped>
.select-wrap{
    position: absolute;
    top: 200px;
    left: 70px;
    height: 72px;
    padding-bottom: 20px;
    border-bottom: 2px solid #3a82f8;
}
.drop-down{
  display: inline-block;
  position: relative;
  border: 2px solid rgb(20, 120, 230);
  border-radius: 4px;
  background-image: linear-gradient(90deg, rgb(7, 28, 154) 0%, rgb(7, 28, 154) 100%);
  box-sizing: border-box;
  cursor: pointer;
  vertical-align: top;
}
.target-value{
  display: inline-block;
  font-size:40px;
  color: #fff;
  line-height: 70px;
  position: relative;
  padding: 0 80px 0 20px;
  overflow: hidden;
}
.target-value:after{
    content: "";
    display: inline-block;
    width: 64px;
    height: 57px;
    background: url(../../../assets/images/common/fold-down-icon.png) no-repeat;
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 0px;
    transition: all 0.5s;
    transform: translateY(-50%) rotate(180deg);
}
.fold:after{
  transform: translateY(-50%) rotate(0);
}
.down-list{
    border-top: 2px solid #000108;
    position: relative;
}
.down-list li{
  cursor: pointer;
  font-size: 34px;
  color: #adb8fc;
  line-height: 40px;
  user-select: none;
  margin: 20px 0;
  text-indent: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 6em;
}
.down-list li:hover{
  color: #fff;
}
.chart-wrap {
  width: 2900px;
  height: 1404px;
  background: url(../../../assets/images/stride/fireworks/chart-bg.png) no-repeat center;
  background-size: 100% 100%;
  margin: 320px auto 0;
  overflow: hidden;
  position: relative;
}
.chart{
  position: absolute;
  top: 70px;
  left: 100px;
  width: 2700px;
  height: 1264px;
  box-sizing: border-box;
}
.chart-legend {
  width: 100%;
  text-align: center;
  position: absolute;
  left: 0;
  bottom: 0;
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

.chart-legend li:nth-child(2) {
  background: url(../../../assets/images/stride/fireworks/chart-legend-value.png) no-repeat 28px 10px;
}

.chart-legend li:nth-child(1) {
  background: url(../../../assets/images/stride/fireworks/chart-legend-tb.png) no-repeat 28px 10px;
}

.chart-legend li:nth-child(3) {
  background: url(../../../assets/images/stride/fireworks/chart-legend-hb.png) no-repeat 28px 10px;
}
</style>
