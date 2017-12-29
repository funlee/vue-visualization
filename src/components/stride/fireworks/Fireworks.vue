<template>
  <div class="fireworks">
    <TopSide :title="title"></TopSide>
    <div class="select-wrap">
      <DropDown></DropDown>
    </div>
  </div>
</template>

<script>
import TopSide from '../../common/TopSide'
import DropDown from '../../common/DropDown'
export default {
  data () {
    return {
      title: '测试页面'
    }
  },
  components: {
    TopSide,
    DropDown
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
</style>
