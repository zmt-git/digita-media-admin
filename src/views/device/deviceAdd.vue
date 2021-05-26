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
          <div class="step-content-form radius-10 box-shadow" v-if="active === 0">
            <device-form-info @submit='submit'></device-form-info>
          </div>
          <div class="step-content-form radius-10 box-shadow" v-if="active === 1">
            <device-form-config :info='info' @next='next'></device-form-config>
          </div>
          <div  class="step-content-system radius-10 box-shadow" v-if="active === 2">
            <device-form-system :info='info' @next='next'></device-form-system>
          </div>
        </transition>
      </div>
  </div>
</template>

<script>
import DeviceFormInfo from '@/components/DeviceFormInfo'
import DeviceFormConfig from '@/components/DeviceFormConfig'
import DeviceFormSystem from '@/components/DeviceFormSystem'
export default {
  name: 'device-add',

  components: { DeviceFormInfo, DeviceFormConfig, DeviceFormSystem },

  data () {
    return {
      active: 0,
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
    width: 550px;
    padding: 20px;
    background-color: #fff;
  }
  &-system{
    width: 300px;
    padding: 20px;
    background-color: #fff;
  }
}

</style>
