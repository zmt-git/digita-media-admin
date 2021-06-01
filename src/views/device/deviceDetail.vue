<template>
  <div class="device-detail" v-loading='loading'>
    <div class="device-detail-info">
      <base-title type='primary'>运行状态</base-title>
      <div class="device-detail-info-control">
        <device-state :info='info'></device-state>
      </div>
      <base-title type='primary'>参数设置</base-title>
      <div class="device-detail-info-control">
        <device-form-config></device-form-config>
      </div>
      <base-title type='primary'>系统设置</base-title>
      <div class="device-detail-info-control">
        <device-form-system></device-form-system>
      </div>
    </div>
    <div class="device-detail-playlist">
      <device-form-play-list class="device-detail-playlist-list" mediaClass='device-detail-screen' :info='info'></device-form-play-list>
      <div class="device-detail-playlist-btn">
        <el-button size="small" type="primary">发布</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseTitle from '@/components/BaseTitle'
import DeviceFormPlayList from '@/components/DeviceFormPlayList'
import DeviceFormConfig from '@/components/DeviceFormConfig.vue'
import DeviceFormSystem from '@/components/DeviceFormSystem.vue'
import DeviceState from '@/components/DeviceState.vue'
import { infoDevice } from '@/api/device'
export default {
  name: 'device-detail',

  components: { BaseTitle, DeviceFormPlayList, DeviceFormConfig, DeviceFormSystem, DeviceState },

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
    height: 100%;
    overflow: auto;
    background-color: #ffffff;
    box-sizing: border-box;
    padding: 10px 0;
    &-control{
      box-sizing: border-box;
      padding: 0 10px;
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
    display: flex;
    flex-direction: column;
    &-list{
      flex: 1;
    }
    &-btn{
      margin-top: 5px;
      text-align: center;
      & button{
        width: 200px;
      }
    }
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
