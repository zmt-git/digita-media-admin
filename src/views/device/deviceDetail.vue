<template>
  <div class="device-detail" v-loading='loading'>
    <div class="device-detail-info">
      <!-- <h3 class="device-name">{{info.name}}</h3> -->
      <!-- <base-title type='primary'>运行状态</base-title> -->
      <div class="device-detail-info-control">
        <device-info :info='info'></device-info>
      </div>
      <div class="device-detail-info-control">
        <device-state :info='info' @updateInfo='updateInfo'></device-state>
      </div>
      <!-- <base-title type='primary'>参数设置</base-title> -->
      <div class="device-detail-info-control">
        <device-form-config :info='info' @updateInfo='updateInfo' :loading.sync='loading' :disabled='disabled'></device-form-config>
      </div>
      <div class="device-detail-info-control">
        <device-form-scenes :info='info' @updateInfo='updateInfo' :loading.sync='loading' :disabled='disabled'></device-form-scenes>
      </div>
      <!-- <base-title type='primary'>系统设置</base-title> -->
      <div class="device-detail-info-control">
        <device-form-system :info='info' @updateInfo='updateInfo' :loading.sync='loading' :disabled='disabled'></device-form-system>
      </div>
    </div>
    <div class="device-detail-playlist">
      <device-form-play-list :loading.sync='loading' :info='info' @updateInfo='updateInfo' :disabled='disabled' type='sunny'></device-form-play-list>
    </div>
  </div>
</template>

<script>
// import BaseTitle from '@/components/BaseTitle'
import DeviceFormPlayList from '@/components/DeviceFormPlayList'
import DeviceFormConfig from '@/components/DeviceFormConfig.vue'
import DeviceFormScenes from '@/components/DeviceFormScenes.vue'
import DeviceFormSystem from '@/components/DeviceFormSystem.vue'
import DeviceState from '@/components/DeviceState.vue'
import DeviceInfo from '@/components/DeviceInfo.vue'
import { infoDevice } from '@/api/device'
export default {
  name: 'device-detail',

  components: { /* BaseTitle, */ DeviceInfo, DeviceFormPlayList, DeviceFormConfig, DeviceFormSystem, DeviceState, DeviceFormScenes },

  computed: {
    disabled () {
      return this.info.stateOnline === 0
    }
  },

  data () {
    return {
      loading: false,
      id: null,
      info: {}
    }
  },

  created () {
    this.id = this.$route.query.id
    this.getDeviceDetail()
  },

  methods: {
    getDeviceDetail () {
      return infoDevice(this.id)
        .then(res => {
          this.info = res.data
        })
        .catch(e => console.log(e))
    },

    async updateInfo () {
      await this.getDeviceDetail()
      this.loading = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/handler.scss';
.device-detail{
  display: flex;
  &-info{
    width: 300px;
    flex-shrink: 0;
    flex-grow: 0;
    height: 100%;
    overflow: auto;
    background-color: #ffffff;
    box-sizing: border-box;
    padding: 0 10px;
    &-control{
      box-sizing: border-box;
      padding: 0px 10px;
      border-bottom: 2px solid #dcdfe6;
    }
    &::-webkit-scrollbar-thumb{
      background-color: #d0d0d0;
    }
    &::-webkit-scrollbar{
      width: 3px;
    }
  }
  &-playlist{
    flex: 1;
    box-sizing: border-box;
    padding: 10px;
    background-color: #fafafa;
    margin-left: 5px;
  }
}
.device-name{
  box-sizing: border-box;
  padding: 5px 10px 15px 10px;
  white-space: nowrap;
  overflow: auto;
  &::-webkit-scrollbar-thumb{
    background-color: #d0d0d0;
  }
  &::-webkit-scrollbar{
    height: 3px;
  }
}
</style>
<style lang="scss">
@media screen and (min-width: 1280px) {
  .device-detail-screen{
    width: calc(50% - 23px);
  }
}
@media screen and (max-width: 1280px) {
  .device-detail-screen{
    width: calc(100% - 23px);
  }
}
@media screen and (max-width: 920px) {
  .device-detail-screen{
    width: calc(100% - 23px);
  }
}
</style>
