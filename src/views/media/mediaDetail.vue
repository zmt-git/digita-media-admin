<!--
 * @Description: 媒体播放页面
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-25 21:41:52
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-25 22:09:22
-->
<template>
  <div class="media-detail" v-loading='loading'>
    <div class="media-detail-content">
      <div class="info">
        <span><i class="iconfont icon-bianhao"></i>媒体编号</span>
        <span>媒体格式</span>
        <span>媒体大小</span>
        <span><i class="iconfont icon-shichang"></i>播放时长</span>
      </div>
      <div class="video-container">
        <video-player :info='info'></video-player>
      </div>
    </div>
    <div class="media-detail-device" v-loading='listLoading'>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">已发布终端</el-menu-item>
        <el-menu-item index="2">发布终端</el-menu-item>
      </el-menu>
      <template v-if="activeIndex === '1'">
        <ul class="device-list">
          <li class="device-list-item" v-for="device in deviceList" :key="device.id">
            <span class="device-list-item_name">{{device.name}}</span>
            <el-button class="device-list-item_btn" type="mini">撤回</el-button>
          </li>
        </ul>
      </template>
      <template v-else-if="activeIndex === '2'">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkList" @change="handleCheckedChange">
          <el-checkbox :label="device.id" v-for="device in deviceList" :key="device.id">{{device.name}}</el-checkbox>
        </el-checkbox-group>
      </template>
    </div>
  </div>
</template>

<script>
import VideoPlayer from '@/components/VideoPlayer'
import { recallMedia, publishMedia, infoMedia } from '@/api/media'
import { unpublishDevice, publishDevice } from '@/api/device'
export default {
  name: 'media-player',

  components: { VideoPlayer },

  data () {
    return {
      loading: false,
      listLoading: false,
      id: null,
      checkAll: false,
      isIndeterminate: true,
      activeIndex: '1',
      info: {},
      allDeviceIds: [],
      deviceList: [],
      checkList: []
    }
  },

  async created () {
    this.loading = true
    this.id = this.$route.query.info.id
    await this.getMediaDetail()
    this.getPublishDeviceList()
    this.loading = false
  },

  methods: {
    handleCheckAllChange (val) {
      this.checkList = val ? this.allDeviceIds : []
      this.isIndeterminate = false
    },

    handleCheckedChange (value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.deviceList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.deviceList.length
    },

    async handleSelect (index) {
      this.deviceList = []
      this.listLoading = true
      this.activeIndex = index
      if (index === '1') {
        await this.getPublishDeviceList()
      } else {
        await this.getUnpublishDeviceList()
      }
      this.listLoading = false
    },

    // 获取媒体详情
    getMediaDetail () {
      return infoMedia(this.id)
        .then(res => {
          this.info = res.data
        })
        .catch(e => console.log(e))
    },

    // 获取发布媒体设备列表
    getPublishDeviceList () {
      return publishDevice({ mediaid: this.info.id })
        .then(res => {
          this.deviceList = res.list
        })
        .catch(e => console.log(e))
    },

    // 获取未发布媒体设备列表
    getUnpublishDeviceList () {
      return unpublishDevice({ mediaid: this.info.id })
        .then(res => {
          this.deviceList = res.list
          this.deviceList.forEach(item => {
            this.allDeviceIds.push(item.id)
          })
        })
        .catch(e => console.log(e))
    },

    // 媒体发布到终端设备
    publishMedia () {
      publishMedia()
    },

    // 媒体撤回终端设备
    recallMedia () {
      recallMedia()
    }
  }
}
</script>
<style lang="scss" scoped>
.media-detail{
  display: flex;
  background: #ffffff;
  padding: 0;
  &-content{
    height: 100%;
    flex: 1;
  }
  &-device{
    width: 335px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-left: 1px solid #f0f0f0;
    /deep/ .el-menu-item{
      width: 50%;
      text-align: center;
    }
    &-list{
      flex: 1;
      box-sizing: border-box;
      padding: 5px;
    }
  }
}
.info{
  height: 60px;
  display: flex;
    align-items: center;
}
.device-list{
  &-item{
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &_name{
      flex: 1;
    }
    &_btn{
      width: 50px;
    }
  }
}
</style>
