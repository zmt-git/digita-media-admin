<!--
 * @Description:
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-25 20:37:16
 * @LastEditors: ZMT
 * @LastEditTime: 2021-06-06 17:51:43

-->
<template>
  <div class="media" v-loading='loading'>
    <div class="infinite-list-wrapper media-list" style="overflow:auto">
      <ul
        class="list"
        v-infinite-scroll="pageLoad"
        infinite-scroll-disabled="scrollDisabled"
      >
        <card-media isAddCard>
          <el-upload
            class="avatar-uploader"
            action=""
            drag
            accept='image/png, image/jpeg'
            :show-file-list="false"
            :before-upload='beforeUpload'
            :http-request='uploadMedia'
            :multiple='true'
            :limit='10'
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__text" style="margin-top: 10px">只能上传jpg/png文件</div>
          </el-upload>
        </card-media>
        <card-media v-for="item in pageList" :key="item.id" :info='item' :tag='true' @delete='deleteMedia'></card-media>
        <base-page-loading :loading='pageLoading' :noMore='noMore'></base-page-loading>
      </ul>
    </div>
    <media-delete-dialog :visible.sync="dialogVisible" @confirm='deleteConfirm'></media-delete-dialog>
  </div>
</template>
<script>
import CardMedia from '@/components/CardMedia.vue'
import BasePageLoading from '@/components/BasePageLoading.vue'
import MediaDeleteDialog from '@/components/MediaDeleteDialog.vue'
import { mediaType } from '@/data/common'
import { getVideoDuration } from '@/utils/tools'
import page from '@/mixins/page'
import media from '@/mixins/media'
import { mapGetters } from 'vuex'
import { listMedia, saveMedia, uploadMedia } from '@/api/media'
export default {
  name: 'media',

  components: { CardMedia, BasePageLoading, MediaDeleteDialog },

  computed: {
    ...mapGetters(['user'])
  },

  mixins: [page, media],

  data () {
    return {
      window: window,
      loading: false,
      dialogVisible: false,
      targetMedia: {},
      checked: false,
      pageRequest: listMedia,
      mediaForm: {
        addressOld: '',
        length: 0,
        mediaType: -1,
        name: '',
        oldSize: 0
      }
    }
  },

  methods: {
    deleteMedia (info) {
      this.dialogVisible = true
      this.targetMedia = info
    },
    // 上传文件前钩子
    beforeUpload (file) {
      const res = mediaType.some(type => {
        return type.type === file.type
      })
      if (!res) {
        this.$message({ type: 'warning', message: '媒体格式只能是PNG和JPG' })
      }
      return res
    },
    // 上传媒体文件
    async uploadMedia (config) {
      this.loading = true
      // 获取存储空间
      await this.$store.dispatch('infoUserActions')

      const file = config.file

      const size = file.size / 1024 / 1024
      // 判断空间是否溢满
      if (this.user.storageTotal < this.user.storageUsed + size) {
        this.$message({ type: 'warning', message: '云空间不足，请删除不需要的媒体' })
        return
      }
      const formData = new FormData()

      formData.append('file', file)

      const res = await this.uploadMediaFile(formData)
      if (res) {
        this.getSaveParams(res, file)
        if (file.type === 'video/mp4') {
          getVideoDuration(file, async (video) => {
            this.mediaForm.length = video.duration
            await this.saveMediaRequest(file)
            this.refresh()
          })
        } else {
          await this.saveMediaRequest(file)
          this.refresh()
        }
      }
      this.loading = false
    },
    // 获取媒体文件请求参数
    getSaveParams (res, file) {
      this.mediaForm.name = file.name
      this.mediaForm.oldSize = file.size / 1024
      this.mediaForm.mediaType = mediaType.find(item => item.type === file.type).mediaType
      this.mediaForm.addressOld = res.addressOld
      this.mediaForm.length = 10
    },
    uploadMediaFile (formData) {
      return uploadMedia(formData)
        .then(res => {
          return res.data
        })
        .catch(e => console.log(e))
    },
    // 上传媒体文件请求
    saveMediaRequest (file) {
      return saveMedia(this.mediaForm)
        .then(res => {
          this.$message({ type: 'success', message: `${file.name}上传成功` })
        })
        .catch(e => console.log(e))
    }
  }
}
</script>

<style lang="scss" scoped>
.media{
  display: flex;
  flex-direction: column;
  &-list{
    flex: 1;
  }
  /deep/ .el-upload-dragger{
    width: 340px;
    height: 238px;
    & .el-icon-upload {
      margin-top: 70px;
    }
  }
}
</style>
