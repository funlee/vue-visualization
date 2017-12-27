<template>
  <div class="left">
    <div class="diandongche">
      <h2 class="chart-title">左模块一
      </h2>
      <ul class="alarm-list">
        <li>
          <p class="alarm-list-name">
            <span>今年</span>
          </p>
          <p class="alarm-list-value">{{thisyear}}</p>
        </li>
        <li>
          <p class="alarm-list-name">
            <span>环比</span>
          </p>
          <p class="alarm-list-value" :data-state="hbstate">{{huanbi}}</p>
        </li>
        <li>
          <p class="alarm-list-name">
            <span>去年</span>
          </p>
          <p class="alarm-list-value">{{lastyear}}</p>
        </li>
      </ul>
    </div>
    <div class="caseResolved">
      <h2 class="chart-title">左模块二</h2>
      <div class="case-resolved-chart" id="caseResolvedChart"></div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import api from '../../../assets/scripts/tool/api'
  import Data from '../../../data/fantasy/castle/left'
  import MultiPie from '../../../assets/scripts/charts/multiPie'
  Data()
  export default {
    name: 'left',
    data () {
      return {
        thisyear: '',
        hbstate: '',
        huanbi: '',
        lastyear: ''
      }
    },
    mounted () {
      const self = this
      axios.get(api.iotalarm)
        .then(response => {
          const data = response.data.result
          self.dealDDC(data.diandongche)
          self.dealCase(data.caseResolved)
        })
        .catch(error => {
          console.error(error)
        })
    },
    methods: {
      dealDDC (data) {
        let hbstate
        let hbValue = data.huanbi
        if (hbValue < 0) {
          hbstate = 'down'
          hbValue = Math.abs(hbValue)
        } else if (hbValue === 0) {
          hbstate = 'level'
          hbValue = '- 0'
        } else if (hbValue > 0) {
          hbstate = 'up'
          hbValue = Math.abs(hbValue)
        }
        this.thisyear = data.thisyear
        this.hbstate = hbstate
        this.huanbi = hbValue
        this.lastyear = data.lastyear
      },
      dealCase (data) {
        const config = {}
        const multiPie = new MultiPie('.case-resolved-chart', config)
        multiPie.render(data)
      }
    }
  }
</script>
<style scoped>
  .diandongche {
    position: absolute;
    top: 220px;
    left: 60px;
    width: 680px;
    height: 600px;
    background: url(../../../assets/images/common/tip-title-bg.png) no-repeat top left;
  }

  .alarm-list {
    position: absolute;
    top: 120px;
    left: 0px;
    width: 100%;
    height: 100%;
    font-size: 0;
  }

  .alarm-list li {
    width: 50%;
    height: 190px;
    overflow: hidden;
    display: inline-block;
    margin-bottom: 10px;
  }

  .alarm-list-name span {
    font-size: 50px;
    color: #b4c7f9;
    position: relative;
    display: inline-block;
  }

  .alarm-list-name span:after {
    content: "件";
    display: inline-block;
    position: absolute;
    top: 4px;
    right: -80px;
    text-align: center;
    font-size: 30px;
    line-height: 46px;
    color: #8da5e4;
    height: 46px;
    width: 60px;
    background: #0c3f87;
    border: 1px solid #443cba;
  }

  .alarm-list li:nth-child(2) .alarm-list-name span:after {
    display: none;
  }

  .alarm-list-value {
    font-size: 60px;
    color: #1aac4e;
    position: relative;
    display: inline-block;
    margin-top:20px;
  }

  .alarm-list li:first-child .alarm-list-value {
    font-size: 90px;
    color: #44ff86;
  }

  .alarm-list li:nth-child(2) .alarm-list-value {
    margin-top: 34px;
    text-indent: 40px;
  }

  .alarm-list li:nth-child(2) .alarm-list-value[data-state="up"] {
    color: #ff4444;
  }

  .alarm-list li:nth-child(2) .alarm-list-value[data-state="level"] {
    color: #b4c7f9;
  }

  .alarm-list li:nth-child(2) .alarm-list-value[data-state="down"] {
    color: #44ff86;
  }

  .alarm-list li:nth-child(2) .alarm-list-value:after {
    content: "%";
    display: inline-block;
    position: absolute;
    bottom: 4px;
    right: -24px;
    font-size: 30px;
  }

  .alarm-list li:nth-child(2) .alarm-list-value[data-state]:before {
    content: "";
    display: inline-block;
    position: absolute;
    width: 25px;
    height: 26px;
    top: 26px;
    left: 0px;
  }

  .alarm-list li:nth-child(2) .alarm-list-value[data-state="up"]:before {
    background: url(../../../assets/images/common/huanbi-up.png) no-repeat;
  }

  .alarm-list li:nth-child(2) .alarm-list-value[data-state="down"]:before {
    background: url(../../../assets/images/common/huanbi-down.png) no-repeat;
  }

  .caseResolved {
    position: absolute;
    top: 830px;
    left: 60px;
    background: url(../../../assets/images/common/tip-title-bg.png) no-repeat top left;
  }

  .case-resolved-chart {
    width: 900px;
    height: 270px;
    margin-top: 130px;
  }
</style>
