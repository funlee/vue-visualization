<template>
  <div class="top-side">
    <div class="title">{{title}}</div>
    <div class="time">{{yyyyMMdd}}
      <strong>{{HHmm}}</strong>
    </div>
  </div>
</template>
<script>
  import Mock from 'mockjs'
  export default {
    props: ['title'],
    name: 'topSide',
    data () {
      return {
        yyyyMMdd: '',
        HHmm: ''
      }
    },
    mounted () {
      const date = Mock.Random.now('yyyyMMddHHmm')
      const year = date.substring(0, 4)
      const month = date.substring(4, 6)
      const day = date.substring(6, 8)
      const hour = date.substring(8, 10)
      const minute = date.substring(10, 12)
      this.yyyyMMdd = `${year}.${month}.${day}`
      this.HHmm = `${hour}:${minute}`
    }
  }
</script>
<style>
  .top-side {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .title {
    font-size: 58px;
    color: #fdfeff;
    position: absolute;
    left: 62px;
    top: 30px;
    text-shadow: 0 0 5px #fbfbfb, 0 0 10px #fbfbfb, 0 0 20px #228DFF, 0 0 35px #228DFF, 0 0 75px #228DFF;
  }

  .time {
    position: absolute;
    top: 30px;
    right: 55px;
    color: #fdfeff;
    font-size: 36px;
    text-shadow: 0 0 5px #fbfbfb, 0 0 10px #fbfbfb, 0 0 20px #228DFF, 0 0 35px #228DFF, 0 0 75px #228DFF;
  }

  .time strong {
    font-size: 60px;
  }

</style>
