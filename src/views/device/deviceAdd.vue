<!--
 * @Description: 添加设备
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-26 19:01:25
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-26 22:22:00
-->
<template>
  <div class="device-add">
    <el-steps :active="active" simple>
      <el-step title="添加设备" icon="el-icon-edit">
        <i slot="icon" class="iconfont icon-del"></i>
      </el-step>
      <el-step title="设置参数" icon="el-icon-upload">
        <i slot="icon" class="iconfont icon-peizhi"></i>
      </el-step>
      <el-step title="设置系统" icon="el-icon-upload">
        <i slot="icon" class="iconfont icon-shezhi"></i>
      </el-step>
      <el-step title="设置播放列表" icon="el-icon-picture">
        <i slot="icon" class="iconfont icon-duomeit"></i>
      </el-step>
    </el-steps>
      <div class="step-content">
        <transition
          enter-active-class="animate__fadeInRight animate__animated"
          leave-active-class="animate__fadeOutLeft animate__animated"
        >
          <div class="step-content-form" v-if="active === 0">
            <device-form-info @submit='submit'></device-form-info>
          </div>
          <div class="step-content-form" v-if="active === 1">
            <device-form-config :info='info' @next='next'></device-form-config>
          </div>
          <div  class="step-content-system" v-if="active === 2">
            <device-form-system :info='info' @next='next'></device-form-system>
          </div>
          <div  class="step-content-list" v-if="active === 3">
            <device-form-play-list :info='info' @next='next'></device-form-play-list>
          </div>
        </transition>
      </div>
  </div>
</template>

<script>
import DeviceFormInfo from '@/components/DeviceFormInfo'
import DeviceFormConfig from '@/components/DeviceFormConfig'
import DeviceFormSystem from '@/components/DeviceFormSystem'
import DeviceFormPlayList from '@/components/DeviceFormPlayList'
export default {
  name: 'device-add',

  components: { DeviceFormInfo, DeviceFormConfig, DeviceFormSystem, DeviceFormPlayList },

  data () {
    return {
      active: 3,
      info: {}
    }
  },

  methods: {
    submit (info) {
      this.info = info
      this.next()
    },
    next () {
      this.active++
    }
  }
}
</script>
<style lang="scss" scoped>
.device-add{
  display: flex;
  flex-direction: column;
}
.step-content{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  &-form{
    width: 400px;
    padding: 20px;
    // background-color: #fff;
  }
  &-system{
    width: 300px;
    padding: 20px;
    // background-color: #fff;
  }
  &-list{
    width: 100%;
    height: 100%;
  }
}

</style>
