<template>
  <div class="device-detail" v-loading='loading'>
    <div class="device-detail-info" @click.self="setSystem">
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
      <div class="device-detail-info-control" v-if="showSystem">
        <device-form-system :info='info' @updateInfo='updateInfo' :loading.sync='loading' :disabled='disabled'></device-form-system>
      </div>
    </div>
    <div class="device-detail-playlist">
      <div class="device-detail-playlist-list">
        <template v-for="(item, key) in scenes">
          <device-form-play-list
            v-for="i in item"
            :key="i.type"
            :type='i.type'
            :scenes='key'
            :loading.sync='loading'
            :info='info'
            :disabled='disabled'
            :playlist='playlist'
            :index='i.index'
            @updateInfo='updateInfo'
          >
          </device-form-play-list>
        </template>
      </div>
      <div class="device-detail-playlist-btn">
        <el-button type="primary">发布</el-button>
      </div>
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
import { getPlaylist } from '@/api/playlist'
import { deviceType } from '@/data/common'
export default {
  name: 'device-detail',

  components: { /* BaseTitle, */ DeviceInfo, DeviceFormPlayList, DeviceFormConfig, DeviceFormSystem, DeviceState, DeviceFormScenes },

  computed: {
    disabled () {
      return this.info.stateOnline === 0
    },
    scenes () {
      const scenes = deviceType.find(item => item.value === this.info.type)
      return scenes ? scenes.scenes : deviceType[0].scenes
    }
  },

  data () {
    return {
      loading: false,
      showSystem: false,
      timmer: null,
      count: 0,
      id: null,
      info: {},
      playlist: []
    }
  },

  async created () {
    this.loading = true
    this.id = this.$route.query.id
    await this.getDeviceDetail()
    await this.getPlaylists()
    this.loading = false
  },

  methods: {
    getDeviceDetail () {
      return infoDevice(this.id)
        .then(res => {
          this.info = res.data
        })
        .catch(e => console.log(e))
    },

    getPlaylists () {
      return getPlaylist(this.id)
        .then(res => {
          this.playlist = res.list
        })
        .catch(e => console.log(e))
    },

    async updateInfo () {
      await this.getDeviceDetail()
      this.loading = false
    },

    setSystem () {
      if (this.timmer) {
        clearTimeout(this.timmer)
        this.timmer = null
      }
      this.count++
      if (this.count >= 5) {
        this.showSystem = true
        return
      }
      this.timmer = setTimeout(() => {
        this.count = 0
        this.showSystem = false
        clearTimeout(this.timmer)
        this.timmer = null
      }, 3000)
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
    padding: 10px 10px 0 10px;
    background-color: #fafafa;
    margin-left: 5px;
    display: flex;
    flex-direction: column;
    &-list{
      flex: 1;
      overflow: auto;
      &::-webkit-scrollbar-thumb{
      background-color: #d0d0d0;
      }
      &::-webkit-scrollbar{
        width: 3px;
      }
    }
    &-btn{
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 5px;
      border-top: 1px solid #f0f0f0;
      & button{
        width: 200px;
      }
    }
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
