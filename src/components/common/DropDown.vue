<template>
  <div class="drop-down">
    <div class="target-value" :class="{fold: isFold}" @click="showFold">昆明市</div>
    <ul class="down-list">
      <li v-for="item in listData" :key="item.id" data-key="item.key" @click="getValue(item.key, item.value)">{{item.value}}</li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'dropDown',
    props: {
      listData: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        dataset: [],
        isFold: true
      }
    },
    mounted () {
      console.log(123)
    },
    methods: {
      showFold () {
        this.isFold = !this.isFold
      },
      getValue (key, value) {
        console.log(key, value)
      }
    }
  }
</script>
<style>
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
    background: url(../../assets/images/common/fold-down-icon.png) no-repeat;
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

