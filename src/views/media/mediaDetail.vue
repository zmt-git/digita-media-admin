<!--
 * @Description: 媒体播放页面
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-25 21:41:52
 * @LastEditors: ZMT
 * @LastEditTime: 2021-06-06 12:16:16
-->
<template>
  <div class="media-detail" v-loading='loading'>
    <!-- 媒体详情 -->
    <div class="media-detail-content">
      <div class="info">
        <div class="info-left">
          <div class="info-left-row">
            <div class="info-left-row_item title" title="媒体编号"><i class="iconfont icon-bianhao icon title-icon"></i>{{info.id}}</div>
            <div class="info-left-row_item title" title="媒体类型">{{mediaType}}</div>
          </div>
          <div class="info-left-row">
            <div class="info-left-row_item" title="播放时长"><i class="iconfont icon-shichang icon"></i>{{length}}</div>
            <div class="info-left-row_item" title="媒体大小"><i class="iconfont icon" :class="mediaIcon"></i>{{oldSize}}</div>
          </div>
        </div>
        <div class="info-right">
          <el-button type="danger" icon="el-icon-delete" circle title="删除媒体" @click="deleteMedia"></el-button>
        </div>
      </div>
      <div class="video-container">
        <video-player v-if="this.info.mediaType === 0" :info='info'></video-player>
        <el-image
          v-else
          style="width: 100px; height: 100px"
          :src="this.info.addressOld"
          :preview-src-list="[this.info.addressOld]">
        </el-image>
      </div>
    </div>
    <!-- 发布设备 -->
    <div v-if="false" class="media-detail-device" v-loading='listLoading'>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">已发布终端</el-menu-item>
        <el-menu-item index="2">发布终端</el-menu-item>
      </el-menu>

      <template v-if="activeIndex === '1'">
        <ul class="device-list">
          <li class="device-list-item" v-for="device in deviceList" :key="device.id">
            <span class="device-list-item_name">{{device.name}}</span>
            <el-button class="device-list-item_btn" type="mini" :disabled='device.stateOnline === 1 ? false : true' @click="retract(device)">撤回</el-button>
          </li>
        </ul>
      </template>

      <template v-else-if="activeIndex === '2'">
        <div class="device-list">
          <el-checkbox :disabled='disabledAll' :indeterminate="isIndeterminate"  v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="checkList" @change="handleCheckedChange">
            <el-checkbox :disabled='device.stateOnline === 1 ? false : true' :label="device.id" v-for="device in deviceList" :key="device.id">{{device.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </template>

      <template v-if="activeIndex === '2'">
        <el-button :disabled='disabledPublish' class="publish" type="primary" @click="pubulish">发布</el-button>
      </template>
    </div>
    <media-delete-dialog :visible.sync="dialogVisible" @confirm='deleteConfirm'></media-delete-dialog>

  </div>
</template>

<script>
import VideoPlayer from '@/components/VideoPlayer'
import MediaDeleteDialog from '@/components/MediaDeleteDialog.vue'
import { recallMedia, publishMedia, infoMedia } from '@/api/media'
// import { unpublishDevice, publishDevice } from '@/api/device'
import media from '@/mixins/media'
export default {
  name: 'media-player',

  mixins: [media],

  components: { VideoPlayer, MediaDeleteDialog },

  computed: {
    disabledAll () {
      return !this.deviceList.every(item => item.stateOnline === 1)
    },
    disabledPublish () {
      return this.disabledAll || this.checkList.length > 0
    }
  },

  data () {
    return {
      loading: false,
      listLoading: false,
      dialogVisible: false,
      id: null,
      checkAll: false,
      isIndeterminate: true,
      activeIndex: '1',
      info: {},
      targetMedia: {},
      allDeviceIds: [],
      deviceList: [],
      checkList: []
    }
  },

  async created () {
    this.loading = true
    this.id = this.$route.query.info.id
    await this.getMediaDetailRequest()
    this.getPublishDeviceListRequest()
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
      this.checkList = []
      this.listLoading = true
      this.activeIndex = index
      if (index === '1') {
        await this.getPublishDeviceListRequest()
      } else {
        await this.getUnpublishDeviceListRequest()
      }
      this.listLoading = false
    },

    // 发布媒体
    pubulish () {
      this.publishMediaRequest()
    },

    // 撤回媒体
    retract (target) {
      this.$confirm(`在【${target.name}】中撤回该媒体吗？`, '重要提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.recallMediaRequest(target)
      }).catch(() => {
      })
    },

    refresh () {
      this.$router.back()
    },

    // 删除媒体
    deleteMedia () {
      this.dialogVisible = true
      this.targetMedia = this.info
    },

    // 获取媒体详情
    getMediaDetailRequest () {
      return infoMedia(this.id)
        .then(res => {
          this.info = res.data
        })
        .catch(e => console.log(e))
    },

    // 媒体发布到终端设备
    publishMediaRequest () {
      return publishMedia({ deviceIds: this.checkList.join(','), mediaId: this.info.id })
        .then(res => {
          if (res.state !== 1) {
            this.$message({ type: 'error', message: '发布失败' })
          } else {
            this.$message({ type: 'success', message: '发布成功' })
            this.getUnpublishDeviceListRequest()
          }
        })
        .catch(e => console.log(e))
    },

    // 媒体撤回终端设备
    recallMediaRequest (target) {
      recallMedia({ deviceId: target.id, isDeletMedia: 1, mediaId: this.info.id })
        .then(res => {
          if (res.state !== 1) {
            this.$message({ type: 'error', message: '撤回失败' })
          } else {
            this.$message({ type: 'success', message: '撤回成功' })
            this.getPublishDeviceListRequest()
          }
        })
        .catch(e => console.log(e))
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/handler.scss';
.media-detail{
  display: flex;
  background: #ffffff;
  padding: 0;
  &-content{
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  &-device{
    width: 340px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-left: 1px solid #f0f0f0;
    /deep/ .el-menu-item{
      width: 50%;
      text-align: center;
    }
    /deep/ .el-checkbox{
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      flex-direction: row-reverse;
      margin-right: 0;
      align-items: center;
    }
    /deep/ .el-checkbox__label{
      font-size: 15px;
      line-height: 40px;
    }
    &-list{
      box-sizing: border-box;
      padding: 5px;
    }
  }
}
.video-container{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #F5F7FA;
  overflow: auto;
  &::-webkit-scrollbar-thumb{
    @include bg-color('danger')
  }
  &::-webkit-scrollbar{
    width: 3px;
  }
}
.info{
  height: 60px;
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  align-items: center;
  line-height: 20px;
  box-sizing: border-box;
  padding: 0 5px;
  border-bottom: 1px solid #f0f0f0;
  &-left{
    display: flex;
    flex-direction: column;
    justify-content: center;
    &-row{
      display: flex;
      align-items: center;
      &_item{
        width: 60px;
        margin-right: 10px;
      }
    }
  }
}
.icon{
  font-size: 12px;
  margin-right: 5px;
}
.title{
  font-size: 16px;
  line-height: 30px;
  color: rgb(75, 75, 75);
  &-icon{
    font-size: 16px;
  }
}

.device-list{
  flex: 1;
  box-sizing: border-box;
  padding: 10px 10px 10px 0;
  color: #606266;
  &-item{
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    line-height: 26px;
    &_name{
      flex: 1;
      padding-left: 10px;
    }
    &_btn{
      width: 50px;
    }
  }
}
.publish{
  width: 100%;
  border-radius: 0;
}
</style>
