<template>
  <div class="device-detail" v-loading='loading'>
    <div class="device-detail-info" @click.self="setSystem">
      <!-- <h3 class="device-name">{{info.name}}</h3> -->
      <!-- <base-title type='primary'>运行状态</base-title> -->
      <div class="device-detail-info-control" @click="toEdit" style='cursor: pointer'>
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
      <div class="device-detail-playlist-list" v-loading='uploadLoading'>
        <template v-for="(item, key) in scenes.scenes">
          <device-form-play-list
            v-for="i in item"
            :hasSwitch='scenes.hasSwitch'
            :key="i.type"
            :type='i.type'
            :scenes='key'
            :loading.sync='uploadLoading'
            :info='info'
            :disabled='disabled'
            :playlist='playlist'
            :index='i.index'
            @changeColor='changeColor'
            @updateInfo='updateInfo'
            @updatePlaylist='updatePlaylist'
            @addPlaylist='showDrawer'
          >
          </device-form-play-list>
        </template>
      </div>
      <div class="device-detail-playlist-btn">
        <el-button v-show="!bntLoading" :disabled='disabled' :type="uploadType" @click="setPlaylist">{{releaseName}}</el-button>
        <span v-show="bntLoading" class="upload-loading">{{releaseName}}</span>
      </div>
      <base-drawer-media :visible.sync='visible' @add='addPlaylist'></base-drawer-media>
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
import { getPlaylist, updateContent, setColor } from '@/api/playlist'
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
      return scenes || deviceType[0]
    },
    uploadType () {
      if (this.info.stateMedia === 1) {
        return 'primary'
      } else {
        return 'danger'
      }
    },
    bntLoading () {
      return this.info.stateMedia === 0 || this.uploadLoading
    },
    releaseName () {
      if (this.info.stateMedia === 0 || this.uploadLoading) {
        return '正在上传播放列表，请稍侯！'
      } else if (this.info.stateMedia === 1) {
        return '发布'
      } else if (this.info.stateMedia === -1) {
        return '重新发布'
      } else {
        return ''
      }
    }
  },

  data () {
    return {
      loading: false,
      uploadLoading: false,
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
    this.playChange = false
    await this.getDeviceDetail()
    await this.getPlaylists()
    this.loading = false
  },

  beforeRouteLeave (to, from, next) {
    if (to.path === '/device/add') {
      to.meta.title = this.isAdd ? '设备添加' : '设备修改'
    }
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
    toEdit () {
      this.$router.push({ path: '/device/add', query: { info: JSON.stringify(this.info), isAdd: false } })
    },

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

    async changeColor (playlist, index, value) {
      console.log(value)
      const id = playlist[index].id
      this.loading = true
      await setColor(id, { playlistid: id, color: value })
        .then(res => {
          this.$message({ type: 'success', message: res.msg })
        })
        .catch(e => console.log(e))
      await this.getPlaylists()
      this.loading = false
    },

    async setPlaylist () {
      this.loading = true
      await this.setPlaylistRequest()
      await this.getPlaylists()
      this.playChange = false
      this.loading = false
    },

    setPlaylistRequest () {
      const ids = []
      const contents = []
      this.playlist.forEach(item => {
        const content = JSON.parse(item.content)
        content.forEach((i, index) => {
          i.mediaOrder = index + 1
        })
        item.content = JSON.stringify(content)
        ids.push(item.id)
        contents.push(item.content)
      })
      const params = { devid: this.id, ids: ids, contents: contents }
      return updateContent(params)
        .then(res => {
          this.$message({ type: 'success', message: res.msg })
        })
        .catch(e => console.log(e))
    },

    async updateInfo () {
      await this.getDeviceDetail()
      this.loading = false
    },

    updatePlaylist (arr, index) {
      const target = this.playlist[index] ? this.playlist[index] : {}
      target.content = JSON.stringify(arr)
      this.playlist.splice(index, 1, target)
      this.playChange = true
    },

    showDrawer (index) {
      this.visible = true
      this.currentIndex = index
    },

    addPlaylist (arr) {
      let originContents
      try {
        originContents = JSON.parse(this.playlist[this.currentIndex].content)
      } catch (e) {
        originContents = []
      }
      const lastOrder = originContents.length + 1
      const addContents = []
      arr.forEach((item, index) => {
        addContents.push({ mediaId: item.id, mediaTime: item.length ? item.length : 1, mediaOrder: lastOrder + index })
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
.upload-loading{
  font-size: 14px;
}
</style>
