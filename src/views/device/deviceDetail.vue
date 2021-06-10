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
      <div class="device-detail-info-control" v-if="false">
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
            @updatePlaylist='updatePlaylist'
            @addPlaylist='showDrawer'
          >
          </device-form-play-list>
        </template>
      </div>
      <div class="device-detail-playlist-btn">
        <el-button type="primary" @click="setPlaylist">发布</el-button>
      </div>
      <base-drawer-media :visible.sync='visible' :playlist='allMediaList' @add='addPlaylist'></base-drawer-media>
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
import BaseDrawerMedia from '@/components/BaseDrawerMedia.vue'

import { infoDevice } from '@/api/device'
import { getPlaylist, updateContent } from '@/api/playlist'
import { deviceType } from '@/data/common'

export default {
  name: 'device-detail',

  components: { /* BaseTitle, */ DeviceInfo, DeviceFormPlayList, DeviceFormConfig, DeviceFormSystem, DeviceState, DeviceFormScenes, BaseDrawerMedia },

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
      visible: false,
      playChange: false,
      timmer: null,
      count: 0,
      currentIndex: 0,
      id: null,
      info: {},
      playlist: [],
      allMediaList: []
    }
  },

  async created () {
    this.loading = true
    this.id = this.$route.query.id
    this.playChange = true
    await this.getDeviceDetail()
    await this.getPlaylists()
    this.loading = false
  },

  beforeRouteLeave (to, from, next) {
    if (this.playChange) {
      this.$confirm('播放列表已变更，是否更新？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.loading = true
        await this.setPlaylistRequest()
        this.loading = false
        next()
      }).catch(() => {
        next()
      })
    } else {
      next()
    }
  },

  methods: {
    getDeviceDetail () {
      return infoDevice(this.id)
        .then(res => {
          this.info = res.data
          this.info.type = 'ELF-A'
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

    async setPlaylist () {
      this.loading = true
      await this.setPlaylistRequest()
      this.loading = false
    },

    setPlaylistRequest () {
      const ids = []
      const contents = []
      this.playlist.forEach(item => {
        ids.push(item.id)
        contents.push(item.content)
      })
      return updateContent({ devid: this.id, ids: ids, contents: contents })
        .then(res => {
          this.$message({ type: 'success', message: '设置播放列表成功' })
        })
        .catch(e => console.log(e))
    },

    async updateInfo () {
      await this.getDeviceDetail()
      this.loading = false
    },

    updatePlaylist (arr, index) {
      const target = this.playlist[index]
      target.content = JSON.stringify(arr)
      this.playlist.splice(index, 1, target)
      this.playChange = true
    },

    showDrawer (index) {
      this.visible = true
      this.currentIndex = index
    },

    addPlaylist (arr) {
      const originContents = JSON.parse(this.playlist[this.currentIndex].content)
      const lastOrder = originContents.length + 2
      const addContents = []
      arr.forEach((item, index) => {
        addContents.push({ mediaId: arr.id, mediaTime: arr.length, mediaOrder: lastOrder + index })
      })
      const newContents = originContents.concat(addContents)
      this.updatePlaylist(newContents, this.currentIndex)
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
