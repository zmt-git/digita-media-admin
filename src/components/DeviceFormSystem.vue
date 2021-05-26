<!--
 * @Description:
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-26 19:01:25
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-26 21:21:40
-->
<template>
  <ul class="device-form-system">
    <li class="device-form-system-item">
      <span class="device-form-system-item_name">开机动画</span>
      <el-switch v-model="info.stateLogo" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
    </li>
    <li class="device-form-system-item">
      <span class="device-form-system-item_name">信息提示</span>
      <el-switch v-model="info.stateInfo" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
    </li>
    <li class="device-form-system-item">
      <span class="device-form-system-item_name">重启只能终端</span>
      <el-button type="primary" size="mini">重启</el-button>
    </li>
    <li class="device-form-system-item">
      <span class="device-form-system-item_name">重启核心程序</span>
      <el-button type="primary" size="mini">重启</el-button>
    </li>
    <li class="device-form-system-item">
      <span class="device-form-system-item_name">上传工作日志</span>
      <el-button type="primary" size="mini">重启</el-button>
    </li>
    <li class="device-form-system-item">
      <span class="device-form-system-item_name">恢复出厂设置</span>
      <el-button type="danger" size="mini">恢复</el-button>
    </li>
    <li class="device-form-system-item">
      <el-button class="btn" type="primary" size="mini" @click="next">下一步</el-button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'device-form',

  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      loading: false
    }
  },
  methods: {
    next () {
      this.$emit('next')
    }
  }
}
</script>
<style lang="scss" scoped>
.device-form-system{
  &-item{
    display: flex;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    // border-bottom: 1px solid #f0f0f0;
    &_name{
      font-size: 14px;
      color: #999999;
    }
  }
}
.btn{
  width: 100%;
}
</style>
