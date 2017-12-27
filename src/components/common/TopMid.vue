<template>
  <div class="top-mid">
    <div class="item" v-for="item in dataset" :key="item.id">
      <span class="name">{{item.name}}
        <strong>{{item.value}}</strong>
      </span>
      <span class="huanbi">环比
        <strong :data-state="item.state">{{item.huanbi}}
          <em>%</em>
        </strong>
      </span>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import api from '../../../src/assets/scripts/tool/api'
  import Data from '../../data/fantasy/castle/top'
  Data()
  export default {
    name: 'topMid',
    data () {
      return {
        dataset: []
      }
    },
    mounted () {
      const self = this
      axios.get(api.castleTop)
        .then(response => {
          const data = response.data.result.top
          data.map(item => {
            let state
            let huanbi
            if (item.huanbi > 0) {
              state = 'up'
              huanbi = item.huanbi
            } else if (item.huanbi === 0) {
              state = 'level'
              huanbi = item.huanbi
            } else if (item.huanbi < 0) {
              state = 'down'
              huanbi = Math.abs(item.huanbi)
            }
            self.dataset.push({
              name: item.name,
              value: item.value,
              huanbi: huanbi,
              state: state
            })
          })
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
</script>
<style>
  .top-mid {
    position: absolute;
    left: 50%;
    top: 30px;
    width: 1650px;
    display: flex;
    justify-content: space-around;
    box-sizing: border-box;
    padding: 24px 20px 0;
    background: url(../../assets/images/common/top-center-bg.png) no-repeat top center;
    background-size: 100% 100%;
    transform: translate(-50%, 0);
    margin-left: -20px;
  }

  .item {
    max-width: 33.33%;
    overflow: hidden;
    white-space: nowrap;
  }

  .name {
    font-size: 40px;
    color: #b4c7f9;
  }

  .name strong {
    font-size: 50px;
    color: #ff8244;
    font-weight: normal;
    margin: 0 10px;
  }

  .huanbi {
    font-size: 30px;
    color: #b4c7f9;
  }

  .huanbi strong {
    font-size: 40px;
    margin: 0 10px 0 36px;
    position: relative;
    display: inline-block;
  }

  .huanbi em {
    font-size: 30px;
  }

  .huanbi strong[data-state]:after {
    content: "";
    display: inline-block;
    position: absolute;
    width: 25px;
    height: 26px;
    top: 14px;
    left: -30px;
  }

  .huanbi strong[data-state="up"] {
    color: #ff4444;
  }

  .huanbi strong[data-state="level"] {
    color: #b4c7f9;
  }

  .huanbi strong[data-state="down"] {
    color: #44ff86;
  }

  .huanbi strong[data-state="up"]:after {
    background: url(../../assets/images/common/huanbi-up.png) no-repeat;
  }

  .huanbi strong[data-state="down"]:after {
    background: url(../../assets/images/common/huanbi-down.png) no-repeat;
  }

</style>
