<template>
  <ul class="device-state">
    <li class="device-state-item">
      <span class="device-state-item_name">在线状态</span>
      <span class="device-state-item_value" :class="this.info.stateOnline ? 'success' : 'info'">{{stateOnline}}</span>
    </li>

    <li class="device-state-item">
      <span class="device-state-item_name">工作状态</span>
      <span class="device-state-item_value" :class="this.info.stateWork ? 'success' : 'primary'">{{stateWork}}</span>
    </li>

    <li class="device-state-item">
      <span class="device-state-item_name">核心温度</span>
      <span class="device-state-item_value" :class="highTemp ? 'error' : 'success'">{{temperature}}</span>
    </li>

    <li class="device-state-item">
      <span class="device-state-item_name">内存使用</span>
      <span class="device-state-item_value" :class="fillStorage ? 'error' : 'success'">{{storage}}</span>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'device-state',

  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    stateOnline () {
      return this.info.stateOnline === 1 ? '在线' : '离线'
    },
    stateWork () {
      return this.info.stateWork === 1 ? '工作' : '休眠'
    },
    temperature () {
      if (typeof (this.info.temperature) === 'number') {
        return this.info.temperature + '℃'
      } else {
        return '0℃'
      }
    },
    storage () {
      return this.filtersStorage(this.info.storageTotal - this.info.storageUsable) + 'G/' + this.filtersStorage(this.info.storageTotal) + 'G'
    },
    highTemp () {
      if (this.info.alarm) {
        return this.detailInfo.alarm.includes('2001')
      } else {
        return false
      }
    },
    fillStorage () {
      if (this.info.alarm) {
        return this.detailInfo.alarm.includes('2002')
      } else {
        return false
      }
    }
  },

  methods: {
    filtersStorage (val) {
      if (typeof (val) === 'number' && !isNaN(val)) {
        return (val / 1024).toFixed(2)
      } else {
        return 0
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.device-state{
  &-item{
    display: flex;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    &_name{
      font-size: 14px;
      color: #606266;
    }
    &_value{
      font-size: 14px;
    }
  }
}
</style>
