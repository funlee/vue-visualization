<template>
  <div class="fireworks">
    <TopSide :title="title"></TopSide>
    <div class="select-wrap">
      <div class="drop-down">
        <div class="target-value" :class="{fold: isFold}" @click="showFold">昆明市</div>
        <ul class="down-list">
          <li v-for="item in districtData" :key="item.id" :data-key="item.key" :title="item.value" @click="getValue(item.key, item.value)">{{item.value}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import TopSide from '../../common/TopSide'
import DropDown from '../../common/DropDown'
import axios from 'axios'
import api from '../../../assets/scripts/tool/api'
import Data from '../../../data/stride/fireworks/district'
Data()
export default {
  data () {
    return {
      title: '测试页面',
      districtData: [],
      isFold: true,
      districtKey: 1
    }
  },
  components: {
    TopSide,
    DropDown
  },
  mounted () {
    this.getData()
  },
  methods: {
    showFold () {
      this.isFold = !this.isFold
    },
    getValue (key, value) {
      console.log(key, value)
    },
    getData () {
      axios.get(`${api.district}/${this.districtKey}`)
        .then(response => {
          let data = response.data.result.city
          this.districtData = data.map(item => {
            return {
              ...item
            }
          })
        })
        .catch(error => console.error(error))
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
  white-space: nowrap;
  user-select: none;
  margin: 20px 0;
  text-indent: 20px;
}
.down-list li:hover{
  color: #fff;
}
</style>
