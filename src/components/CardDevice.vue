<!--
 * @Description: 设备卡片
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-25 22:10:54
 * @LastEditors: ZMT
 * @LastEditTime: 2021-06-06 16:38:58
-->
<template>
  <li class="detail-device box-shadow radius-10" @click="setup">
    <!-- <div class="mask" v-if="this.info.stateOnline !== 1"></div> -->
    <div class="detail-device-status">
      <div class="detail-device-status-img">
        <span v-if="hasError" class="iconfont icon-tanhao6 error detail-device-status-img_icon"></span>
        <img class="detail-device-status-img_inner" src="../assets/device/device.png" alt="设备图片">
      </div>
      <div class="detail-device-info">
        <!-- <base-storage :info='info'></base-storage> -->
        <div class="detail-device-info-item" :title="type">
          <span class="detail-device-info-item_icon iconfont icon-cpu"></span>
          <p class="detail-device-info-item_value ellipsis-1">{{type}}</p>
        </div>
        <div class="detail-device-info-item" :title="location">
          <span class="detail-device-info-item_icon iconfont icon-location"></span>
          <p class="detail-device-info-item_value ellipsis-1">{{location}}</p>
        </div>
        <div class="detail-device-info-item" :title="name">
          <span class="detail-device-info-item_icon iconfont icon-video"></span>
          <p class="detail-device-info-item_value ellipsis-1">{{name}}</p>
        </div>
      </div>
      <div class="detail-device-status_right">
        <base-dot :ripple='workStatus' :borderClass='stateClass' :bgClass='stateClassBg' :title="title"></base-dot>
        <!-- <i class="iconfont icon-wenduji icon" :style="{ color: highTemp ? '#f56c6c' : '#67c23a' }" :title="tempTitle"></i> -->
        <!-- <i class="iconfont icon-shezhi icon set-icon primary" title="设置" ></i> -->
        <!-- <i class="iconfont icon-edit icon set-icon primary" title="编辑" @click.stop="toEdit"></i> -->
      </div>
    </div>
  </li>
</template>
<script>
// import BaseStorage from './BaseStorage.vue'
import BaseDot from './BaseDot'
export default {
  name: 'detail-device',

  components: { /* BaseStorage */ BaseDot },

  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    title () {
      if (this.info.stateOnline === 1) {
        return this.info.stateWork === 1 ? '工作' : '休眠'
      } else {
        return '离线'
      }
    },
    stateClass () {
      if (this.info.stateOnline === 1) {
        return this.info.stateWork === 1 ? 'online' : 'standby'
      } else {
        return 'offline'
      }
    },
    stateClassBg () {
      if (this.info.stateOnline === 1) {
        return this.info.stateWork === 1 ? 'online-bg' : 'standby-bg'
      } else {
        return 'offline-bg'
      }
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
    type () {
      return this.info.type ? this.info.type : ''
    },
    highTemp () {
      return this.info.alarm && this.info.alarm.includes('2001')
    },
    tempTitle () {
      return this.highTemp ? '设备高温' : '温度正常'
    },
    hasError () {
      return this.info.stateMedia === -1
    }
  },

  methods: {
    setup () {
      this.$emit('setup', this.info)
    },
    toEdit () {
      this.$emit('toEdit', this.info)
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-device{
  display: inline-block;
  box-sizing: border-box;
  padding: 5px;
  margin: 5px;
  position: relative;
  overflow: hidden;
  background-color: #fff;
  cursor: pointer;
  width:  calc(33.33% - 10px);
  &-status{
    display: flex;
    width: 100%;
    &-img{
      width: 100px;
      height: 100px;
      position: relative;
      &_inner{
        width: 100px;
        height: 100px;
        float: left;
      }
      &_icon{
        width: 25px;
        height: 25px;
        font-size: 30px;
        position: absolute;
        top: 5px;
        right: 5px;
        background: #fff;
        border-radius: 50%;
        &::before{
          position: absolute;
          top: -3px;
          left: -3px;
        }
      }
    }
    &_right{
      width: 26px;
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 8px 0;
    }
  }
  &-info{
    color: #999999;
    flex: 1;
    box-sizing: border-box;
    padding: 0 5px;
    &-item{
      height: 33px;
      width: 100%;
      display: flex;
      align-items: center;
      &_icon{
        font-size: 24px;
        padding: 0 20px;
      }
      &_value{
        flex: 1;
        width: 1px;
        font-size: 15px;
      }
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
