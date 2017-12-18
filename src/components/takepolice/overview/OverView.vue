<template>
  <div class="overview">
    <div class="page-top">
      <div class="page-title">接处警总览</div>
      <div class="right-time">2017.02.26
        <strong>16:47</strong>
      </div>
    </div>
    <div class="top-mid">
      <div class="top-mid-item">
        <span class="top-mid-item-name">本周
          <strong>3429</strong>
        </span>
        <span class="top-mid-item-huanbi">环比
          <strong data-state="down">74.12
            <em>%</em>
          </strong>
        </span>
      </div>
      <div class="top-mid-item">
        <span class="top-mid-item-name">本月
          <strong>1565</strong>
        </span>
        <span class="top-mid-item-huanbi">环比
          <strong data-state="level">- 0
            <em>%</em>
          </strong>
        </span>
      </div>
      <div class="top-mid-item">
        <span class="top-mid-item-name">本年
          <strong>77197</strong>
        </span>
        <span class="top-mid-item-huanbi">环比
          <strong data-state="up">41.89
            <em>%</em>
          </strong>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'overview',
    data() {
      return {
        msg: 'this is -- takepolice-overview component'
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
