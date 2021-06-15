<!--
 * @Description: 添加设备
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-26 19:01:25
 * @LastEditors: ZMT
 * @LastEditTime: 2021-06-02 22:21:28
-->
<template>
  <div class="device-add"  v-loading='loading'>
    <!-- <el-steps :active="active" simple>
      <el-step :title="item.title" :icon="item.icon" v-for="item in steps" :key="item.title">
        <i slot="icon" class="iconfont" :class="item.icon"></i>
      </el-step>
    </el-steps> -->
    <div class="step-content">
      <transition
        enter-active-class="animate__fadeInRight animate__animated"
        leave-active-class="animate__fadeOutLeft animate__animated"
      >
        <div class="step-content-form" v-if="active === 0">
          <device-form-info @submit='submit' :loading.sync='loading' :dataForm='info' :isAdd='isAdd'></device-form-info>
        </div>
        <!-- <div class="step-content-form" v-if="active === 1">
          <device-form-config :info='info' @next='next' @updateInfo='updateInfo' :loading.sync='loading' :disabled='disabled'></device-form-config>
        </div>
        <div  class="step-content-system" v-if="active === 2">
          <device-form-system :info='info' @next='next' @updateInfo='updateInfo' :loading.sync='loading' :disabled='disabled'></device-form-system>
        </div>
        <div  class="step-content-list" v-if="active === 3">
          <device-form-play-list ref="playlist" :info='info' @next='next' @updateInfo='updateInfo' :loading.sync='loading' :disabled='disabled'></device-form-play-list>
        </div> -->
      </transition>
    </div>
    <div class="btn-box" v-if="active !== 0">
      <el-button size="small" type="primary" @click="next">{{active !== 3 ? '跳过' : '返回首页'}}</el-button>
      <el-button v-if="active === 3" size="small" type="success" @click="carryOut" :disabled='disabled'>发布</el-button>
    </div>
  </div>
</template>

<script>
import DeviceFormInfo from '@/components/DeviceFormInfo'
// import DeviceFormConfig from '@/components/DeviceFormConfig'
// import DeviceFormSystem from '@/components/DeviceFormSystem'
// import DeviceFormPlayList from '@/components/DeviceFormPlayList'
import { infoDevice } from '@/api/device'
import { deviceAddSteps } from '@/data/common'
export default {
  name: 'device-add',

  components: { DeviceFormInfo /* DeviceFormConfig, DeviceFormSystem, DeviceFormPlayList */ },

  computed: {
    disabled () {
      return !this.info.stateOnline
    }
  },

  data () {
    return {
      isAdd: true,
      active: 0,
      info: {},
      loading: false,
      steps: deviceAddSteps
    }
  },

  created () {
    this.isAdd = this.$route.query.isAdd === 'true'
    if (!this.isAdd) {
      this.$route.meta.title = '设备编辑'
      this.info = JSON.parse(this.$route.query.info)
    } else {
      this.$route.meta.title = '设备添加'
    }
  },

  methods: {
    submit (info) {
      this.info = info
      this.$router.back()
    },
    next () {
      this.active++
      if (this.active > 3) {
        this.$router.back()
      }
    },
    async carryOut () {
      const result = await this.$refs.playlist.updateList()
      if (result) {
        this.$router.back()
      }
    },
    getDeviceDetail () {
      return infoDevice(this.id)
        .then(res => {
          this.info = res.data
        })
        .catch(e => {
          this.$refs.ruleForm.resetFields()
        })
    },
    async updateInfo () {
      await this.getDeviceDetail()
      this.loading = false
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
  overflow: auto;
  &-form{
    width: 800px;
    padding: 20px;
    overflow: auto;
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
.btn-box{
  margin-top: 10px;
  text-align: center;
  & button{
    width: 150px;
  }
}
</style>
