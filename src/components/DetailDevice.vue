<!--
 * @Description: 设备卡片
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-25 22:10:54
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-25 23:33:29
-->
<template>
  <div class="detail-device">
    <span class="detail-device_status outer_status" :class="stateClass" :title="title">
    </span>
    <span class="detail-device_status" :class="stateClassBg"></span>

    <img class="detail-device_img" src="../assets/test/device.png" alt="设备图片">
    <div class="detail-device-info">
      <h3>名称</h3>
      <h3>在线</h3>
      <el-tag effect="dark" size="small">高温</el-tag>
      <el-tag effect="dark" size="small">存储将满</el-tag>
      <el-tag effect="dark" size="small">休眠</el-tag>
    </div>
  </div>
</template>
<script>
export default {
  name: 'detail-device',

  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    title () {
      return this.info.stateOnline === 1 ? '在线' : '离线'
    },
    stateClass () {
      return this.info.stateOnline === 1 ? 'online' : 'offline'
    },
    stateClassBg () {
      return this.info.stateOnline === 1 ? 'online-bg' : 'offline-bg'
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
  border-radius: 10px;
  box-shadow: 0px 3px 8px 3px #f0f0f0f0;
  position: relative;
  &_status {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    right: 10px;
    border: 1px solid transparent;
  }
  &_img{
    width: 100px;
    height: 100px;
    display: inline-block;
  }
}
.outer_status{
  border: 1px solid transparent;
  background-color: transparent;
}
.online-bg{
  background-color: #67c23a;
}
.offline-bg{
  background-color: #909399;
}
.online{
  border-color: #67c23a;
  animation: zoom 1s infinite;
}
.offline{
  border-color: #909399;
  border: 1px solid #909399;
}

@keyframes zoom {
  0% { transform: scale(1); }
  10% { transform: scale(1.1); }
  20% { transform: scale(1.2); }
  30% { transform: scale(1.3); }
  40% { transform: scale(1.4); }
  50% { transform: scale(1.5); }
  60% { transform: scale(1.4); }
  70% { transform: scale(1.3); }
  80% { transform: scale(1.2); }
  90% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
</style>
