<!--
 * @Description:
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-25 20:37:16
 * @LastEditors: ZMT
 * @LastEditTime: 2021-06-06 17:51:43

-->
<template>
    <div class="infinite-list-wrapper media-list media" v-loading='loading' style="overflow:auto">
      <ul
        class="list"
        v-infinite-scroll="pageLoad"
        infinite-scroll-disabled="scrollDisabled"
      >
        <card-media isAddCard>
          <el-upload
            drag
            action=""
            ref="upload"
            class="avatar-uploader"
            accept='image/bmp, image/jpeg'
            :auto-upload='false'
            :show-file-list="false"
            :before-upload='beforeUpload'
            :on-change='onChange'
            :multiple='true'
            :limit='10'
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <!-- <div class="el-upload__text" style="margin-top: 10px">不再支持视频，只能上传图片，bmp和jpg两种</div> -->
          </el-upload>
        </card-media>
        <card-media v-for="item in pageList" :key="item.id" :info='item' @delete='deleteMedia'></card-media>
        <base-page-loading :loading='pageLoading' :noMore='noMore' :list='pageList'></base-page-loading>
      </ul>
    </div>
    <!-- <media-delete-dialog :visible.sync="dialogVisible" @confirm='deleteConfirm'></media-delete-dialog> -->
</template>
<script>
import CardMedia from '@/components/CardMedia.vue'
import BasePageLoading from '@/components/BasePageLoading.vue'
// import MediaDeleteDialog from '@/components/MediaDeleteDialog.vue'
import { mediaType } from '@/data/common'
// import { getVideoDuration } from '@/utils/tools'
import page from '@/mixins/page'
import media from '@/mixins/media'
import { mapGetters } from 'vuex'
import { listMedia, saveMedia, uploadMedia } from '@/api/media'
export default {
  name: 'media',

  components: { CardMedia, BasePageLoading },

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
      },
      filelist: [],
      timer: null
    }
  },

  methods: {
    deleteMedia (info) {
      // this.dialogVisible = true
      this.targetMedia = info
      this.$confirm('是否删除媒体？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteConfirm()
      }).catch(() => {
      })
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

    onChange (file, filelist) {
      this.filelist = filelist
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.uploadMedia()
      }, 0)
    },

    async uploadMedia () {
      this.loading = true

      await this.$store.dispatch('infoUserActions')
      const reduce = (accumulator, currentValue) => accumulator + currentValue.raw.size / 1024 / 1024
      const size = this.filelist.reduce(reduce, 0)
      // 判断空间是否溢满
      if (this.user.storageTotal < this.user.storageUsed + size) {
        this.$message({ type: 'warning', message: '云空间不足，请删除不需要的媒体' })
      }
      const promiseMedia = []
      const promiseInfo = []

      // 上传媒体至媒体服务器
      this.filelist.forEach(file => {
        const p = this.createMediaUploadPromise(file.raw)
        promiseMedia.push(p)
      })

      await Promise.allSettled(promiseMedia)
        .then(res => {
          console.log(res)
          res.forEach(item => {
            const p = this.createMediaSavePromise(item.value)
            promiseInfo.push(p)
          })
        })
        .catch(e => console.log(e))

      // 上传媒体信息
      await Promise.allSettled(promiseInfo)
        .catch(e => console.log(e))

      this.$refs.upload.clearFiles()
      this.filelist = []
      // 刷新列表
      this.refresh()

      this.loading = false
    },
    // 上传媒体文件
    createMediaUploadPromise (file) {
      // 获取存储空间
      const formData = new FormData()

      formData.append('file', file)

      return this.uploadMediaFile(formData, file)
    },

    createMediaSavePromise (res) {
      const mediaForm = this.getSaveParams(res, res.file)
      return this.saveMediaRequest(res.file, mediaForm)
    },

    // 获取媒体文件请求参数
    getSaveParams (res, file) {
      const mediaForm = {}
      const type = file.type.split('/').pop()
      const name = (this.user.mobile || 'unknown') + '/' + new Date().getTime() + '.' + type
      mediaForm.name = name
      mediaForm.size = file.size / 1024
      mediaForm.mediaType = mediaType.find(item => item.type === file.type).mediaType
      mediaForm.address = res.url
      mediaForm.length = 10
      return mediaForm
    },

    uploadMediaFile (formData, file) {
      return uploadMedia(formData)
        .then(res => {
          return { ...res, file: file }
        })
        .catch(e => {
          console.log(e)
          this.$message({ type: 'error', message: `${file.name}上传失败` })
        })
    },

    // 上传媒体文件请求
    saveMediaRequest (file, mediaForm) {
      return saveMedia(mediaForm)
        .then(res => {
          this.$message({ type: 'success', message: `${file.name}上传成功` })
        })
        .catch(e => {
          console.log(e)
          this.$message({ type: 'error', message: `${file.name}上传失败` })
        })
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
  /deep/ .el-upload {
    width: 100%;
  }
  /deep/ .el-upload-dragger{
    width: 100%;
    height: 227px;
    & .el-icon-upload {
      margin-top: 70px;
    }
  }
}
</style>
