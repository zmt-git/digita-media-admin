<!--
 * @Description: 设备卡片
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-25 22:10:54
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-25 23:33:29
-->
<template>
  <li class="detail-device box-shadow radius-10">
    <!-- <div class="mask" v-if="this.info.stateOnline !== 1"></div> -->
    <div class="detail-device-status">
      <img class="detail-device-status_img" src="../assets/test/device.png" alt="设备图片">
      <div class="detail-device-status_right">
        <base-dot :ripple='workStatus' :borderClass='stateClass' :bgClass='stateClassBg' :title="title"></base-dot>
        <i class="iconfont icon-wenduji icon" :style="{ color: highTemp ? '#f56c6c' : '#67c23a' }" :title="tempTitle"></i>
        <i class="iconfont icon-shezhi icon set-icon primary" title="设置" @click="setup"></i>
      </div>
    </div>
    <div class="detail-device-info">
      <base-storage :info='info'></base-storage>
      <h3 class="detail-device-info_name ellipsis-1" :title="name">{{name}}</h3>
      <h3 class="detail-device-info_location ellipsis-1" :title="location">{{location}}</h3>
    </div>
  </li>
</template>
<script>
import BaseStorage from './BaseStorage.vue'
import BaseDot from './BaseDot'
export default {
  name: 'detail-device',

  components: { BaseStorage, BaseDot },

  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    title () {
      if (this.info.stateOnline === 1) {
        return this.info.stateWork === 1 ? '工作' : '待机'
      } else {
        return '离线'
      }
    },
    stateClass () {
      return this.info.stateOnline === 1 ? 'online' : 'offline'
    },
    stateClassBg () {
      return this.info.stateOnline === 1 ? 'online-bg' : 'offline-bg'
    },
    workStatus () {
      return !!(this.info.stateOnline && this.info.stateWork)
    },
    name () {
      return this.info.name ? this.info.name : ''
    },
    location () {
      return this.info.location ? this.info.location : ''
    },
    highTemp () {
      return this.info.alarm && this.info.alarm.includes('2001')
    },
    tempTitle () {
      return this.highTemp ? '设备高温' : '温度正常'
    }
  },

  methods: {
    setup () {
      this.$emit('setup', this.info)
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-device{
  float: left;
  box-sizing: border-box;
  padding: 5px;
  margin: 5px;
  position: relative;
  overflow: hidden;
  background-color: #fff;
  &-status{
    &:after{
      content:'';
      clear:both;
      display:block;
      height:0;
      overflow:hidden;
      visibility:hidden;
    }
    &_img{
    width: 100px;
    height: 100px;
    float: left;
    }
    &_right{
      float: right;
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }
  }
  &-info{
    color: #999999;
    width: 130px;
    line-height: 1.8;
    &_name{
      font-size: 15px;
    }
    &_location{
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
.icon{
  font-size: 26px;
}
.set-icon{
  cursor: pointer;
  font-size: 20px;
}
.mask{
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
}
</style>
