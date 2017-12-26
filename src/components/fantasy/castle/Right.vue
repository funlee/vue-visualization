<template>
  <div class="right">
    <div class="diandongchetop5">
      <h2 class="chart-title">电动车数TOP5</h2>
      <div class="diandongchetop5-svg-wrap">
        <svg class="diandongchetop5-svg">

        </svg>
      </div>
    </div>
    <div class="jizhantop5">
      <h2 class="chart-title">基站数TOP5</h2>
      <ul class="jizhantop5-list">
        <li class="jizhan-item" v-for="list in jizhan" :key="list.id">
          <div class="jizhan-item-index" :style="{color:list.color}">1</div>
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
  import api from '../../../tool/api'
 import Data from '../../../data/fantasy/castle/bandTop'
  Data()
  import axios from 'axios'
  import * as d3 from 'd3'
  export default {
    name: 'right',
    data() {
      return {
        jizhan: []
      }
    },
    mounted() {
      const self = this
      console.log(api.iottop5)
      axios.get(api.iottop5)
        .then(response => {
          const data = response.data.result
          console.log(data)
          self.dealDDC(data.ddc)
          self.dealJizhan(data.jizhan)
        })
        .catch(error => {
          console.error(error)
        })
    },
    methods: {
      dealDDC(data) {

      },
      dealJizhan(data) {
        const color = ['#ffd43d', '#efefef', '#eb8711', '#14c7fb', '#14c7fb']
        const max = d3.max(data, d => {
          return d.value
        })
        data.map((item, i) => {
          this.jizhan.push({
            barWidth: item.value * 360 / max,
            value: parseInt(item.value, 10),
            color: color[i],
            name: item.name
          })
        })
      }
    }
  }

</script>
<style>
  .diandongchetop5 {
    z-index: 1;
    position: absolute;
    top: 220px;
    right: 70px;
    width: 540px;
    height: 516px;
    background: url(../../../assets/images/common/tip-title-bg.png) no-repeat top left;
  }

  .diandongchetop5-svg-wrap {
    width: 100%;
    height: 100%;
  }

  .diandongchetop5-svg {
    height: 100%;
    z-index: 50;
    display: block;
    margin: 0 auto;
    width: 100%;
  }

  .diandongche-tooltip {
    position: absolute;
    padding: 10px 15px;
    background: rgba(59, 57, 54, 0.8);
    border-radius: 5px;
    border: 1px solid #928a82;
    color: #fff;
    font-size: 30px;
    z-index: 10;
  }

  .text-legend {
    position: absolute;
    left: 20px;
    color: #AD006B;
    font-size: 1.2em;
    text-align: center;
    text-transform: uppercase;
    font-family: "Avenir Bold", Arial bold, Helvetica bold;
  }

  .groupsales rect:first-of-type {
    transform-origin: 50% 50%;
    -webkit-transform-origin: 50% 50%;
    /*transform: skewY(30deg) translateY(-20px);*/
    transform: skewY(10deg) translateY(-20px);
    -webkit-transform: skewY(10deg) translateY(-20px);
  }

  .groupsales rect:nth-child(2) {
    transform-origin: 50% 50%;
    -webkit-transform-origin: 50% 50%;
    transform: skewY(-60deg) translateY(-33px);
    -webkit-transform: skewY(-60deg) translateY(-33px);
  }

  .background_blur_info {
    /* background: url("http://twin-dev.net/experiments/codevember/d3js-barcharts/img/station-background.jpg") no-repeat fixed 0 0; */
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    position: fixed;
    bottom: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    height: auto;
    width: auto;
    z-index: -100;
    -webkit-filter: blur(20px);
    filter: blur(20px);
  }
  /*基站TOP5*/

  .jizhantop5 {
    position: absolute;
    top: 743px;
    right: 70px;
    width: 540px;
    height: 690px;
    background: url(../../../assets/images/common/tip-title-bg.png) no-repeat top left;
  }

  .jizhantop5 .jizhantop5-list {
    margin-top: 136px;
  }

  .jizhantop5 .jizhantop5-list .jizhan-item {
    width: 100%;
    height: 100px;
    margin-top: 10px;
    background: url(../../../assets/images/fantasy/castle/top-item-bg.png) 0% 0% / 100% 100% no-repeat;
  }

  .jizhantop5 .jizhantop5-list .jizhan-item-index {
    float: left;
    height: 100%;
    line-height: 100px;
    width: 82px;
    text-align: center;
    color: #14c7fb;
    font-size: 36px;
  }

  .jizhantop5 .jizhantop5-list .jizhan-item-container {
    float: left;
    box-sizing: border-box;
    height: 100%;
    padding: 20px 0px 20px 10px;
  }

  .jizhantop5 .jizhantop5-list .jizhan-bar-container {
    width: 445px;
    height: 25px;
    line-height: 25px;
  }

  .jizhantop5 .jizhantop5-list .jizhan-back-bar {
    position: relative;
    float: left;
    width: 360px;
    height: 24px;
    margin-right: 10px;
    background: url(../../../assets/images/fantasy/castle/top-progress-bg.png) 0% 0% / 100% 100% no-repeat;
  }

  .jizhantop5 .jizhantop5-list .jizhan-outer-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 24px;
    background: linear-gradient(to right, #1963a7 0%, #bec374 100%)
  }

  .jizhantop5 .jizhantop5-list .jizhan-value {
    float: left;
    color: #3da3ff;
    font-size: 30px;
  }

  .jizhantop5 .jizhantop5-list .jizhan-item-name {
    font-size: 30px;
    color: #b0caf9;
  }

</style>
