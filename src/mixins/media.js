import { secondFormat } from '@/utils/tools/dateTool'
import { deleteMedia } from '@/api/media'
export default {
  computed: {
    mediaName () {
      return this.info.mediaType === 0 ? '视频媒体' : '图片媒体'
    },

    mediaType () {
      if (this.info.mediaType === 0) {
        return 'MP4'
      } else if (this.info.mediaType === 1) {
        return 'JPG'
      } else {
        return 'PNG'
      }
    },
    mediaIcon () {
      return this.info.mediaType === 0 ? 'icon-icon_moments_mp4' : 'icon-tupian1'
    },
    oldSize () {
      return this.info.oldSize ? (this.info.oldSize / 1024).toFixed(2) + 'MB' : '0MB'
    },
    state () {
      return this.info && this.info.state !== 1
    },
    btnType () {
      return this.getState(this.info.state).type
    },
    btnName () {
      return this.getState(this.info.state).name
    },
    length () {
      return secondFormat(this.info.length)
    }
  },

  methods: {
    getState (state) {
      // -1：删除，0，审核中，-2，审核失败，1：正常；
      let obj = { name: '审核中', type: 'primary' }
      switch (state) {
        case 0: obj = { name: '审核中', type: 'primary' }
          break
        case -2: obj = { name: '审核失败', type: 'warning' }
          break
      }
      return obj
    },
    deleteMedia (info) {
      this.dialogVisible = true
      this.targetMedia = info
    },
    // 确认删除--》删除请求
    async deleteConfirm (checked) {
      const params = {
        id: this.targetMedia.id,
        isDeletMedia: checked ? 1 : 0
      }
      this.loading = true
      await deleteMedia(params)
        .then(res => {
          if (res.state === 1) {
            this.$message({ message: '删除成功', type: 'success' })
            this.dialogVisible = false
            this.refresh && this.refresh()
          } else {
            this.$message({ message: '删除失败', type: 'error' })
          }
        })
        .catch(e => console.log(e))
      this.loading = false
    }
  }
}
