<template>
  <div class="right">
    <div class="people-sex">
      <h2 class="chart-title">右模块一</h2>
      <div class="sex-chart" id="sexChart">
        <svg>
          <defs>
            <linearGradient id="outline" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color: rgb(6, 124, 255); stop-opacity: 1;"></stop>
              <stop offset="100%" style="stop-color: rgb(160, 60, 218);stop-opacity: 1;"></stop>
            </linearGradient>
            <linearGradient id="innerBall" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color: rgb(6, 124, 255); stop-opacity: 1;"></stop>
              <stop offset="100%" style="stop-color: rgb(160, 60, 218);stop-opacity: 1;"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div class="sex-legend">
        <p class="male">男性
          <span>{{male}}</span>
          <em>%</em>
        </p>
        <p class="female">女性
          <span>{{100 - male}}</span>
          <em>%</em>
        </p>
      </div>
    </div>
    <div class="jizhan">
      <h2 class="chart-title">右模块TOP5</h2>
      <ul class="jizhan-list">
        <li class="jizhan-item" v-for="(list,index) in jizhan" :key="list.id">
          <div class="jizhan-item-index" :style="{color:list.color}">{{index + 1}}</div>
          <div class="jizhan-item-container">
            <div class="jizhan-bar-container">
              <div class="jizhan-back-bar">
                <div class="jizhan-outer-bar" :style="{width:list.barWidth}"></div>
              </div>
              <div class="jizhan-value">{{list.value}}</div>
            </div>
            <div class="jizhan-item-name">{{list.name}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import * as d3 from 'd3'
  import axios from 'axios'
  import WaterBall from '../../../assets/scripts/charts/waterBall'
  import api from '../../../assets/scripts/tool/api'
  import Data from '../../../data/fantasy/castle/bandTop'
  Data()
  export default {
    name: 'right',
    data () {
      return {
        male: 0,
        jizhan: []
      }
    },
    mounted () {
      const self = this
      axios.get(api.iottop5)
        .then(response => {
          const data = response.data.result
          self.dealDDC(data.sex)
          self.dealJizhan(data.jizhan)
        })
        .catch(error => {
          console.error(error)
        })
    },
    methods: {
      dealDDC (data) {
        this.male = data.male
        const config = {}
        const waterBall = new WaterBall('#sexChart', config)
        waterBall.drawCharts(data)
      },
      dealJizhan (data) {
        const color = ['#ffd43d', '#efefef', '#eb8711', '#14c7fb', '#14c7fb']
        const max = d3.max(data, d => {
          return d.value
        })
        data.map((item, i) => {
          this.jizhan.push({
            barWidth: `${item.value * 100 / max}%`,
            value: parseInt(item.value, 10),
            color: color[i],
            name: item.name
          })
        })
      }
    }
  }
</script>
<style scoped>
  .people-sex {
    position: absolute;
    top: 220px;
    right: 70px;
    width: 540px;
    height: 516px;
    background: url(../../../assets/images/common/tip-title-bg.png) no-repeat top left;
  }

  .sex-chart {
    margin-top:70px;
  }

  .sex-legend {
    position: absolute;
    top: 50%;
    right: 4%;
    transform: translateY(-50%);
  }

  .sex-legend p {
    font-size: 38px;
    color: #fff;
    padding-left: 40px;
    line-height: 1.5;
  }

  .sex-legend p span {
    color: #44ff86;
    font-size: 40px;
    margin: 0 12px 0 8px;
  }

  .sex-legend p em {
    color: #44ff86;
    font-size: 28px;
  }

  .sex-legend .male {
    background: url(../../../assets/images/fantasy/castle/male-legend.png) no-repeat left center;
  }

  .sex-legend .female {
    background: url(../../../assets/images/fantasy/castle/female-legend.png) no-repeat left center;
  }

  .jizhan {
    position: absolute;
    top: 743px;
    right: 70px;
    width: 540px;
    height: 690px;
    background: url(../../../assets/images/common/tip-title-bg.png) no-repeat top left;
  }

  .jizhan-list {
    margin-top: 136px;
  }

  .jizhan-item {
    width: 100%;
    height: 100px;
    margin-top: 10px;
    background: url(../../../assets/images/fantasy/castle/top-item-bg.png) 0% 0% / 100% 100% no-repeat;
  }

  .jizhan-item-index {
    float: left;
    height: 100%;
    line-height: 100px;
    width: 82px;
    text-align: center;
    color: #14c7fb;
    font-size: 36px;
  }

  .jizhan-item-container {
    float: left;
    box-sizing: border-box;
    height: 100%;
    padding: 20px 0px 20px 10px;
  }

  .jizhan-bar-container {
    width: 445px;
    height: 25px;
    line-height: 25px;
  }

  .jizhan-back-bar {
    position: relative;
    float: left;
    width: 360px;
    height: 24px;
    margin-right: 10px;
    background: url(../../../assets/images/fantasy/castle/top-progress-bg.png) 0% 0% / 100% 100% no-repeat;
  }

  .jizhan-outer-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 24px;
    background: linear-gradient(to right, #1963a7 0%, #bec374 100%)
  }

  .jizhan-value {
    float: left;
    color: #3da3ff;
    font-size: 30px;
  }

  .jizhan-item-name {
    font-size: 30px;
    color: #b0caf9;
  }

</style>
