<template>
  <ul class="device-state">
    <li class="device-state-item">
      <span class="device-state-item_name">设备编号</span>
      <span class="device-state-item_value ellipsis-1" :title="code">{{ code }}</span>
    </li>

    <li class="device-state-item">
      <span class="device-state-item_name">设备型号</span>
      <span class="device-state-item_value ellipsis-1" :title="type">{{ type }}</span>
    </li>

    <li class="device-state-item">
      <span class="device-state-item_name">安装位置</span>
      <span class="device-state-item_value ellipsis-1" :title="location">{{ location }}</span>
    </li>

    <li class="device-state-item">
      <span class="device-state-item_name">设备名称</span>
      <span class="device-state-item_value ellipsis-1" :title="name">{{ name }}</span>
    </li>

    <!-- <li class="device-state-item">
      <span class="device-state-item_name">安装方向</span>
      <span class="device-state-item_value" :title="orient">{{orient}}</span>
    </li> -->

    <li class="device-state-item">
      <span class="device-state-item_name">供电方式</span>
      <span class="device-state-item_value" :title="power">{{ power }}</span>
    </li>
  </ul>
</template>
<script>
import { orient, powerOptions } from '@/data/common'

export default {
  name: 'device-state',

  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    code() {
      return this.info.code ? this.info.code : ''
    },
    type() {
      return this.info.type ? this.info.type : ''
    },
    location() {
      return this.info.location ? this.info.location : ''
    },
    name() {
      return this.info.name ? this.info.name : ''
    },
    orient() {
      const obj = orient.find(item => item.value === this.info.stateOrient)
      return obj ? obj.label : ''
    },
    power() {
      const obj = powerOptions.find(item => item.value === this.info.power)
      return obj ? obj.label : ''
    }
  }
}
</script>
<style lang="scss" scoped>
.device-state {
  &-item {
    display: flex;
    height: 40px;
    justify-content: space-between;
    align-items: center;
    &_name {
      width: 60px;
      font-size: 14px;
      color: #606266;
    }
    &_value {
      flex: 1;
      width: 100px;
      font-size: 14px;
      text-align: right;
      line-height: 18px;
    }
  }
}
</style>
