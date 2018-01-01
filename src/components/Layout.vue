<template>
  <div class="layout">
    <div class="side-l-nav" :class="{active:navShow}">
      <div class="side-l-inner-wrap">
        <div class="side-nav-content">
          <div class="side-nav-list">
            <p class="side-nav-til fantasy">专题一</p>
            <ul>
              <li class="active">
                <router-link to="/fantasy/castle">威廉古堡</router-link>
              </li>
            </ul>
          </div>
          <div class="side-nav-list">
            <p class="side-nav-til stride">专题二</p>
            <ul>
              <li>
                <router-link  to="/stride/fireworks">烟花易冷</router-link>
              </li>
            </ul>
          </div>
          <div class="side-nav-list">
            <p class="side-nav-til excleamation">专题三</p>
            <ul>
              <li>
                <router-link to="/excleamation/sailor" replace>水手怕水</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="side-nav-btn" @click="navBtn" :class="{active:navShow}">
          <span class="side-nav-arrow"></span>
        </div>
      </div>
    </div>
    <div class="side-r-wrap">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'layout',
    data () {
      return {
        navShow: true
      }
    },
    methods: {
      navBtn () {
        this.navShow = !this.navShow
      }
    }
  }
</script>
<style scoped>
  .layout {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .side-l-nav {
    width: 100%;
    position: fixed;
    z-index: 40;
    background: rgba(0, 0, 0, .7);
    overflow: hidden;
    height: 100%;
  }

  .side-nav-content {
    display: inline-block;
    height: 100%;
    margin-top: 80px;
    width: 100%;
  }

  .side-l-inner-wrap {
    max-width: 600px;
    background: url(../assets/images/common/nav-bg.png) no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    position: relative;
  }

  .side-l-nav.active {
    width: 36px;
  }

  .side-l-nav.active .side-nav-content {
    display: none;
  }

  .side-nav-list {
    width: 100%;
    margin-bottom: 80px;
  }

  .side-nav-til {
    font-size: 36px;
    color: #00ffff;
    height: 186px;
    width: 100%;
    padding-top: 106px;
    box-sizing: border-box;
    background: url(../assets/images/common/nav-icon.png) no-repeat;
    background-size: 100% auto;
    text-align: center;
  }

  .fantasy{
    background-position: 0px -154px;
  }

  .stride{
    background-position: 0px -756px;
  }

  .exclamation{
    background-position: 0px -1352px;
  }

  .side-nav-list ul {
    width: 100%;
  }

  .side-nav-list li {
    width: 100%;
    white-space: nowrap;
    cursor: pointer;
  }

  .side-nav-list li a {
    display: block;
    width: 100%;
    line-height: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #436979;
    font-size: 36px;
    text-align: center;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .side-nav-list li.active a,
  .side-nav-list li:hover a {
    color: #00ffff;
    background: url(../assets/images/common/nav-icon.png) no-repeat 0 -1028px;
    background-size: 100% auto;
  }

  .side-nav-btn {
    width: 36px;
    height: 49px;
    position: absolute;
    top: 50%;
    right: -26px;
    transform: translate(0, -50%);
    cursor: pointer;
    background: url(../assets/images/common/nav-btn-bg.png) no-repeat center;
  }

  .side-nav-arrow {
    width: 10px;
    height: 18px;
    position: absolute;
    top: 50%;
    right: 14px;
    margin-top: -9px;
    background: url(../assets/images/common/nav-btn-arrow.png) no-repeat;
    background-size: 100% 100%;
  }

  .side-nav-btn.active .side-nav-arrow {
    transform: rotate(180deg);
  }

  .side-nav-btn.active {
    right: 0px;
  }

  .side-r-wrap {
    margin-left: 35px;
    flex: 1;
    height: 100%;
    background: url(../assets/images/common/page-bg.jpg) no-repeat;
    background-size: 100% 100%;
    position: relative;
    overflow: hidden;
  }

</style>
